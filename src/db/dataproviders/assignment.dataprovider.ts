import { Prisma } from '@prisma/client';
import { prisma } from '../..';

const AssignmentDataprovider = {
  assignNextFlightToRunwayTx: async (airportCode: string, runwayId: string) => {
    return prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const now = new Date();

      // 1. Load runway
      let runway = await tx.runway.findUnique({ where: { id: runwayId } });
      if (!runway) throw new Error(`Runway ${runwayId} not found`);
      if (runway.airportCode !== airportCode) {
        throw new Error(`Runway ${runwayId} does not belong to airport ${airportCode}`);
      }

      // === 2. Handle Cool-Off First ===
      if (runway.status === 'cooling_off') {
        const coolOffEndsAt = new Date(runway.lastResetAt.getTime() + runway.coolOffSeconds * 1000);
        if (now >= coolOffEndsAt) {
          // Cool-off complete → reset state
          await tx.runway.update({
            where: { id: runwayId },
            data: {
              status: 'available',
              currentCount: 0,
              lastResetAt: now,
            },
          });
          runway.status = 'available';
          runway.currentCount = 0;
          runway.lastResetAt = now;
        } else {
          // Still cooling → reject
          throw new Error(`Runway ${runwayId} is cooling off until ${coolOffEndsAt.toISOString()}`);
        }
      }

      // === 3. Handle Hourly Reset ===
      const oneHourLater = new Date(runway.lastResetAt.getTime() + 60 * 60 * 1000);
      if (now >= oneHourLater) {
        await tx.runway.update({
          where: { id: runwayId },
          data: {
            currentCount: 0,
            lastResetAt: now,
          },
        });
        runway.currentCount = 0;
        runway.lastResetAt = now;
      }

      // === 4. Final Availability Check ===
      if (runway.status !== 'available') {
        throw new Error(`Runway ${runwayId} is not available (status: ${runway.status})`);
      }

      // === 5. Check If Runway Already in Use ===
      const inUse = await tx.flight.findFirst({
        where: {
          airportCode,
          assignedRunwayId: runwayId,
          landedAt: null,
        },
      });

      if (inUse) {
        throw new Error(`Runway ${runwayId} is already in use by flight ${inUse.flightId}`);
      }

      // === 6. Fetch Next Flight by Priority ===
      const nextFlight = await tx.flight.findFirst({
        where: {
          airportCode,
          assignedRunwayId: null,
        },
        orderBy: [
          { priority: 'desc' }, // emergency > normal
          { queuePosition: 'asc' },
        ],
      });

      if (!nextFlight) {
        throw new Error('No flights waiting to land');
      }

      // === 7. Assign Flight ===
      const assigned = await tx.flight.update({
        where: { flightId: nextFlight.flightId },
        data: {
          assignedRunwayId: runwayId,
          assignedAt: now,
        },
        select: {
          flightId: true,
          assignedRunwayId: true,
          assignedAt: true,
        },
      });

      // === 8. Update Usage Count and Possibly Trigger Cool-Off ===
      const willHitCapacity = (runway.currentCount + 1 >= runway.capacityPerHour);

      await tx.runway.update({
        where: { id: runwayId },
        data: {
          currentCount: { increment: 1 },
          ...(willHitCapacity && {
            status: 'cooling_off',
            lastResetAt: now,
          }),
        },
      });

      return assigned;
    });
  },

  getActiveAssignments: async (airportCode: string) => {
    return prisma.flight.findMany({
      where: {
        airportCode,
        assignedRunwayId: { not: null },
        landedAt: null,
      },
      select: {
        flightId: true,
        assignedRunwayId: true,
        assignedAt: true,
      },
    });
  },
};

export default AssignmentDataprovider;

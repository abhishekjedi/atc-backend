export type Airport = {
    code: string;
    name: string;
    timezone: string;
    lat: number;
    lng: number;
    
}

export type FlightStatus = 'normal' | 'emergency';

export type Flight = {
  flightId: string;
  airportCode: string;
  origin?: string | null;
  destination?: string | null;
  status: FlightStatus;
  requestedAt: Date;
  queuePosition: number;
  assignedRunwayId?: string | null;
  assignedAt?: Date | null;
  landedAt?: Date | null;
}

export type RunWayRequest = {
    id: string;
    capacityPerHour: number;
    coolOffSeconds: number;
    airportCode: string;
};

export type Runway = {
    id: string;
    airportCode: string;
    capacityPerHour: number;
    coolOffSeconds: number;
    lastResetAt: Date;
    currentCount: number;
    status: RunwayStatus;
};

export enum RunwayStatus  {
 AVAILABLE =  "available",
 MAINTAINANCE =  "maintenance",
 COOLING_OFF =  "cooling_off"
}

export type flightRequest = {
    flightId: string,
    status: FlightStatus,
    requestedAt: Date,
    airportCode: string
}
import amqp from 'amqplib';

let channel: amqp.Channel;

export const connectRabbitMQ = async () => {
  const connection = await amqp.connect(process.env.RABBITMQ_URI || 'amqp://localhost');
  channel = await connection.createChannel();
};

const getRabbitMQChannel = async (): Promise<amqp.Channel> => {
  if (!channel) {
    await connectRabbitMQ();
  }
  return channel!;
};


export const publishMsgToQueue = async (payload: any, queueName: string) => {
  const message = Buffer.from(JSON.stringify(payload));

  const maxRetries = 3;
  let retries = 0;

  while (retries < maxRetries) {
    try {
      const channel = await getRabbitMQChannel();
      await channel.assertQueue(queueName, { durable: false });
      channel.sendToQueue(queueName, message);
      return; // ✅ Success
    } catch (err) {
      retries++;
      console.error(`Failed to publish (attempt ${retries}):`, err);

      // Optional backoff delay (e.g., 100ms, 200ms, 400ms)
      await new Promise((res) => setTimeout(res, 100 * 2 ** retries));
    }
  }

  throw new Error('Failed to publish to RabbitMQ after 3 retries');
};
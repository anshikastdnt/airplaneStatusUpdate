// rabbitmq.js
const amqp = require('amqplib');

const rabbitMQUrl = 'amqp://localhost';
const exchangeName = 'flight_status_exchange';
const queueName = 'flight_status_queue';
const routingKey = 'flight_status_routing_key';

async function connectToRabbitMQ() {
  const connection = await amqp.connect(rabbitMQUrl);
  const channel = await connection.createChannel();

  await channel.assertExchange(exchangeName, 'direct', { durable: true });
  await channel.assertQueue(queueName, { durable: true });
  await channel.bindQueue(queueName, exchangeName, routingKey);

  return channel;
}

module.exports = connectToRabbitMQ;
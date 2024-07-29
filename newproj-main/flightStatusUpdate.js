
const rabbitMQ = require('./rabbitMq');

async function updateFlightStatus(flightNumber, status) {
  const channel = await rabbitMQ();

  const message = {
    flightNumber,
    status
  };

  channel.publish(exchangeName, routingKey, Buffer.from(JSON.stringify(message)));
}

module.exports = updateFlightStatus;
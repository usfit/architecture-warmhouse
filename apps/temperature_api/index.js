const express = require('express');

const app = express();
const PORT = process.env.PORT || 8081;

const getLocationBysensorId = (sensorId) => {
  let location = "";

  switch (sensorId) {
		case "1":
			location = "Living Room"
      break;
		case "2":
			location = "Bedroom"
      break;
		case "3":
			location = "Kitchen"
      break;
		default:
			location = "Unknown"
  }

  return location;
}

const getsensorIdByLocation = (location) => {
  let sensorId = "";

  switch (location) {
		case "Living Room":
			sensorId = "1"
      break;
		case "Bedroom":
			sensorId = "2"
      break;
		case "Kitchen":
			sensorId = "3"
      break;
		default:
			sensorId = "0"
		}

    return sensorId;
}

const getResponseBody = (location, sensorId) => ({
  value: Number((Math.random() * 10 + 18).toFixed(1)),
  unit: 'C',
  timestamp: new Date().toISOString(),
  location,
  sensor_id: sensorId,
  status: "active",
  sensor_type: "temperature",
  description: `температура датчика ${sensorId} в ${location}`
})

app.get('/temperature', (req, res) => {
  const location = req.query.location || '';
  const sensorId = getsensorIdByLocation(location);
  const body = getResponseBody(location, sensorId);

  return res.json(body);
});

app.get('/temperature/:sensorId', (req, res) => {
  const sensorId = req.params.sensorId;
  const location = getLocationBysensorId(sensorId);
  const body = getResponseBody(location, sensorId);

  return res.json(body)
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`temperature-api listening on port ${PORT}`);
});

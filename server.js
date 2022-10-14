const express = require('express');
const app = express();
const port = 8000;

const dayRoute = require('./routes/dayRoute');
const interviewRoute = require('./routes/interviewRoute');
const availableRoute = require('./routes/availableRoute');

app.use(express.json());

app.use('/', dayRoute);
app.use('/', interviewRoute);
app.use('/', availableRoute);

app.listen(port, () => console.log(`Server is running on port ${port}`));

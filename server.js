const express = require('express');
const app = express();
const port = 8000;
const dayRoute = require('./routes/daysRoute');

app.use(express.json());

app.use('/', dayRoute);

app.listen(port, () => console.log(`Server is running on port ${port}`));

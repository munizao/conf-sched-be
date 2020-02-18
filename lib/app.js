const cors = require('cors');
const express = require('express');
const app = express();

app.use(express.json());
app.use(cors({ credentials: true, origin:['http://localhost:7890'] })); //TODO: add deployed site as origin

app.use('/api/v1/presenter', require('./routes/presenter'));
app.use('/api/v1/presentation', require('./routes/presentation'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;

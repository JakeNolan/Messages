const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const keys = require('./config/keys');

require('./models/Message');

const messageRoutes = require('./routes/messageRoutes');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());

messageRoutes(app);

const PORT = 5000;
app.listen(PORT);
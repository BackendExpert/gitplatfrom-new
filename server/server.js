const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');


// routes
const ConnectDB = require('./config/DB');
const repoRoute = require('./routes/repoRoute')


const app = express();
const PORT = process.env.PORT || 5000;

ConnectDB();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/repos', express.static(path.join(__dirname, 'repos')));

app.use('/repo', repoRoute)

app.get('/', (req, res) => {
    res.send(`Server running on port ${PORT}`);
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require("body-parser");
const authRoute = require('./routes/auth');
const accountRoute = require('./routes/account');
const characterRoute = require('./routes/character');



const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
const PORT = process.env.PORT || 5000;

app.use('/auth', authRoute);
app.use('/account', accountRoute);
app.use('/character', characterRoute);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

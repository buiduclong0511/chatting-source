const express = require('express');
const cors = require("cors");
require('dotenv').config();

const db = require("./config/db");
const route = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(cors({
    origin: '*'
}));

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})

route(app);

// connect db
db.connect();

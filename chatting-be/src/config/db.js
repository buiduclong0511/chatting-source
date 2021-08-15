const mongoose = require('mongoose');

const atlasURI = "mongodb://localhost:27017/chat_real_time";

async function connect() {
    try {
        await mongoose.connect(atlasURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connect successfully!");
    } catch (err) {
        console.log("Connect failure!");
        console.log("Error: ", err);
    }
}

module.exports = { connect };
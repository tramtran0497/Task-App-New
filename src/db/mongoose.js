const mongoose = require('mongoose');
const User = require("../models/User");
// Connect MongoDB Cloud
// mongoose.connect(process.env.MONGODB_CLOUD_URL)
//     .then(() => console.log("Database is connected!"))
//     .catch(err => console.log("Database connects error!", err))

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true, 
});


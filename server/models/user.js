const { Mongoose } = require("mongoose");

const userSchema = new Mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }

})


const user = Mongoose.model('user', userSchema);
module.exports = user
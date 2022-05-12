const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const taskSchema = new mongoose.Schema( {
    name:{
        type: String,
        required: true,
        minlength: [4, "Your task name is too short, at least having 4 characters."],
        trim: true,
    },
    description:{
        type: String,
        required: true,
        trim: true,
    },
    isCompleted:{
        type:  Boolean,
        default: false,
        trim: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    }
    },
    { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
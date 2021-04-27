const mongoose = require("mongoose"),
    { Schema } = require("mongoose"),
    courseSchema = new Schema(
        {
            title: {
                type: String,
                required: true,
                unique: true
            },
            description: {
                type: String, required: true
            },
            maxStudents: {
                type: Number,
                default: 0,
                min : [0, "Course cannot have a neg numr of students"]
            },
            cost: {
                type: Number,
                default: 0,
                min: [0, "Costs cannot be negative value."]
            }
        },
        {
            timestamps: true
        }
    )
module.exports = mongoose.model("Course", courseSchema);
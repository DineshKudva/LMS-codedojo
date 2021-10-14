const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  Description: {
    type: String,
    required: [true, "description not entered"],
  },
  Completed: {
    type: Boolean,
    required: [true, "status not set"],
  },
  Deadline: {
    type: Date,
    required: [true, "Deadline not set"],
  },
});

//fire a function after doc saved to db
userSchema.post("save", function (doc, next) {
  console.log("new task was added:", doc);
  next();
});

const Task = mongoose.model("task", userSchema);

module.exports = Task;

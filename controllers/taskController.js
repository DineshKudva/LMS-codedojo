const Task = require('../models/Task');
const User = require('../models/User');




module.exports.addtask_get=(req,res)=>{
     res.render('addtask',{title: 'Add Task'})
}
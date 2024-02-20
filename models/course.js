const mongoose = require("mongoose");

const Course = mongoose.model("Course",
  new mongoose.Schema({
    course_name: String,
    modules:[{
        index:Number,
        module_open:Boolean,
        module_name:String,
        module_description:String,
        modules_content:[
            {
                item_index:Number,
                item_name:String,
                item_type:String,
                item_url:String,
            }
        ]
    }]
  })
);

module.exports = Course;
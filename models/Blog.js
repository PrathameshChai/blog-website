const mongoose = require('mongoose')
const {Schema} = require('mongoose')

const BlogSchema = new Schema({
  authorId:{
    type : Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  authorName:{
    type: String,
    required: true
  }
  ,
  title:{
    type: String,
    required: true
  },
  body:{
    type: String,
    required: true
  },
  coverImg:{
    type: String,
    default: "https://images.pexels.com/photos/3631711/pexels-photo-3631711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  }
},{timestamps:true})

const Blog = mongoose.model('blog',BlogSchema);

module.exports = Blog

var mongoose = require('mongoose');

module.exports = (function (){
    // DB connections 
    mongoose.connect('mongodb://rbhindwale:ruchibh12@ds121455.mlab.com:21455/dailytodo', { useNewUrlParser: true });
    var dbConnect = mongoose.connection;
    var Schema = mongoose.Schema;

    var userSchema = new Schema({
      username: String,
      password: String,
      user_id: Number
    },{ collection: 'Users' });

    var todoSchema = new Schema({
      user_id: Number,
      todos:[{
          task_id: String,
          status: String,
          description: String
        }
      ]
    },{ collection: 'todos' });

    var userRecords = mongoose.model('Users', userSchema);
    var todosRecords = mongoose.model('todos', todoSchema);
    return {
      userRecords: userRecords,
      todosRecords: todosRecords
    };
})();
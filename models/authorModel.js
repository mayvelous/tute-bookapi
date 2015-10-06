var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var authorSchema = new Schema({
    Name: {type: String},
    Gender: {type: String}
});

module.exports = mongoose.model('Author', authorSchema);

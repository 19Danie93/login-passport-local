const mongoose = require('mongoose');
const  { mongodb } = require('./keys');
mongoose.connect(mongodb.URI,{useNewUrlParser: true})
.then(db=> console.log('mongodb conected'))
.catch(err => console.log(err));
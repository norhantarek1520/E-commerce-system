const mongoose = require('mongoose');

module.exports = ()=>{
    mongoose.connect(process.env.MONGO_URL)
    .then(()=>{ console.log('Database is connected succesfully !')})
    .catch(()=>{console.log('Failed to connect Database !')})
    
}

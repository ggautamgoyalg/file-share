const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    try{
        await mongoose.connect('mongodb+srv://ggautamgoyalg:YCsQXyd62OyTVCpM@cluster0.hghqlji.mongodb.net/test');
    console.log("connected");
    }
    catch(error){
        console.log(error);
    }
  

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

module.exports = main;
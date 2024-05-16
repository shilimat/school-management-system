const mongoose= require('mongoose');
const db='mongodb+srv://shilimat2001:sms123@cluster0.wgqknls.mongodb.net/sms?retryWrites=true&w=majority';

const connectDB = async () => {
    try{
   await mongoose.connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    }catch(err){
        console.error(err);
    }
}

module.exports= connectDB
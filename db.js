const mongoose=require("mongoose")

mongoose.set(`strictPopulate`,false)
mongoose.set(`strictQuery`,false)

mongoose.connect(process.env.DB_URL).then(()=>{
    console.log(`Connected`);
}).catch(err=>{console.log(err);})
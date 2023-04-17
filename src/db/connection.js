import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectionURL = process.env.DATABASE_CONNECTION_URL;

export const connectToDB = async () => {
  try{
    await mongoose.connect(connectionURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }, () => {
      console.log("auth db connected!");
      return mongoose;
  })
}
   catch(err){
    console.log(err);
   } 
};
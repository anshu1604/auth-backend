import mongoose from 'mongoose';
const { Schema } = mongoose;

const OtpSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    mobile: {
        type: Number,
        trim: true
    },
    otp: {
        type: Number,
        trim: true
    },
    created_on: {
        type: Date
    },
    updated_on: {
        type: Date,
        default: Date.now
    },
    deleted_on: {
        type: Date
    }
})

const Otp = mongoose.model("otp", OtpSchema);

OtpSchema.set('toJSON', {
    virtuals: true
});

export default Otp;
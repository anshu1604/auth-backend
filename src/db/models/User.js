import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
    user_id: {
        type: String,
        trim: true,
        unique: true
    },
    first_name: {
        type: String,
        trim: true
        },
    last_name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    mobile: {
        type: String,
        trim: true
    },
    country: {
        type: String,
        trim: true
    },
    dob: {
        type: Date,
        trim: true
    },
    gender: {
        type: Number,
        trim: true
    },
    status: {
        type: Number,
        required: true
    },
    token: {
        type: String,
        trim: true
    },
    created_on: {
        type: Date
    },
    last_updated: {
        type: Date,
        default: Date.now
    },
    deleted_on: {
        type: Date
    }
})

const User = mongoose.model("user", UserSchema);

UserSchema.set('toJSON', {
    virtuals: true
});

export default User;
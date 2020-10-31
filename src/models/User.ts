import mongoose, {Schema} from 'mongoose';
import {IUserModel} from "core/interfaces/models/IUserModel";

const UserSchema: Schema = new mongoose.Schema({
    firstname: {
        type: String,
        required: false
    },
    lastname: {
        type: String,
        required: false
    },
    username:{
        type: String,
        minlength: 3,
        maxlength: 30,
        required: false
    },
    email:{
        type: String,
        minlength: 5,
        maxlength: 60,
        required: false
    },
    password:{
        type: String,
        minlength: 8,
        maxlength: 1024,
        required: false
    },
    churches: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Church',
            required: false
        }
    ],
    donations: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Donation',
            required: false
        }
    ],
    resetPasswordToken: {
        type: String,
        required: false
    },
    resetPasswordExpires: {
        type: Date,
        required: false
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

export default mongoose.model<IUserModel>('User', UserSchema);

import { Schema, model } from 'mongoose'
import bcrypt from 'bcryptjs'
import timezone from 'mongoose-timezone'

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        valid: {
            type: Boolean,
            default: true
        },
        password: {
            type: String,
            required: true
        },
        roles: [
            {
                ref: 'Role',
                type: Schema.Types.ObjectId
            }
        ]
    },
    {
        timestamps: true,
        versionKey: false
    }
)

userSchema.statics.encryptPassword = async password => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

userSchema.statics.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword)
}

userSchema.plugin(timezone)
export default model('User', userSchema)
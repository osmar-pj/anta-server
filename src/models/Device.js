import { Schema, model } from 'mongoose'

const deviceSchema = new Schema(
    {
        mac: String,
        place: String,
        s: [
            {
                type: Object
            }
        ],
        userId: {
            ref: 'User',
            type: Schema.Types.ObjectId
        }
    },
    {
        versionKey: false
    }
)

export default model('Device', deviceSchema)
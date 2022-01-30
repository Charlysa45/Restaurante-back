const {Schema, model} = require('mongoose')

const restSchema = new Schema({
    socialReason: String,
    name: String,
    restType: Number,
    city: String,
    hourOpen: String,
    hourClose: String,
    menus: [{
        type: Schema.Types.ObjectId,
        ref: 'Menu'
    }]
})

restSchema.set('toJSON',{
    transform:(document, returnedObject)=>{
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject._v
    }
})

const Restaurant = model('Restaurant', restSchema)

module.exports = Restaurant  
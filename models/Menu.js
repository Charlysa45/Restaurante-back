const {Schema, model} = require('mongoose')

const menuSchema = new Schema({
    restaurant: [{
        type: Schema.Types.ObjectId,
        ref: 'Restaurant'
    }],
    menuType: Number,
    nameMenu: String,
    ingredients: Array,
    price: Number,
})

menuSchema.set('toJSON',{
    transform:(document, returnedObject)=>{
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject._v
    }
})

const Menu = model('Menu', menuSchema)

module.exports = Menu
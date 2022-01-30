const Menu = require('../models/Menu')
const Restaurant = require('../models/Restaurante')
const menuRouter = require('express').Router()

menuRouter.get('/', async(req, res)=>{
    const rest = await Menu.find({}).populate('restaurant')
    res.json(rest)
})

menuRouter.route('/:id').get(async (req, res) => {
    const { id } = req.params
  
    const games = await Menu.findById(id).populate('restaurant')
    res.json(games)
  })

menuRouter.route('/').post(async (req, res) => {
    const {restaurant, menuType, nameMenu, ingredients, price} = req.body

    const restId = await Restaurant.findById(restaurant)
    console.log(restId)
    
    const newMenu = new Menu({
        restaurant: restId._id,  
        menuType,
        nameMenu,
        ingredients,  
        price 
    })
    try{
        const savedMenu = await newMenu.save()

        restId.menus = restId.menus.concat(savedMenu._id)
        await restId.save()

        res.json(savedMenu) 
    }catch(error){
        console.error(error)
    }

})

menuRouter.route('/:id').put(async (req, response) => {
    
    const { id } = req.params
    const {restaurant, menuType, nameMenu, ingredients, price} = req.body
    
        const newMenu = { 
            menuType,
            nameMenu,
            ingredients,
            price
        };

        await Menu.findByIdAndUpdate(id, newMenu, {new: true} )
        .then(res => {
          response.json(res)
        })
    
    }) 

menuRouter.route('/:id').delete(async (req, response) => {

    const { id } = req.params
        await Menu.findByIdAndDelete(id)
        .then(res => {
            response.json(res)
        })
    
    })  
    
module.exports = menuRouter 
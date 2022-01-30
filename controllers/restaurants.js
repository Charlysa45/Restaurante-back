const Restaurant = require('../models/Restaurante')
const restRouter = require('express').Router()

restRouter.get('/', async(req, res)=>{
    const rest = await Restaurant.find({}).populate('menus',{
        menuType: 1,
        nameMenu: 1,
        ingredients: 1,
        price:1
    })
    res.json(rest)
})

restRouter.route('/:id').get(async (req, res) => {
    const { id } = req.params
  
    const restaurants = await Restaurant.findById(id).populate('menus')
    res.json(restaurants)
  })

restRouter.route('/').post(async (req, res) => {
    const {socialReason, name, restType, city, hourOpen, hourClose} = req.body

    const newRest = new Restaurant({
        socialReason,
        name, 
        restType,
        city,
        hourOpen,
        hourClose
    })
    try{
        const savedRest = await newRest.save()
        res.json(savedRest)
    }catch(error){
        console.error(error)
    }
})

restRouter.route('/:id').put(async (req, response) => {
    
    const { id } = req.params
    const {socialReason, name, restType, city, hourOpen, hourClose} = req.body
    
        const newRest = { 
            socialReason,
            name, 
            restType,
            city,
            hourOpen,
            hourClose
        };

        await Restaurant.findByIdAndUpdate(id, newRest, {new: true} )
        .then(res => {
          response.json(res)
        })
    
    }) 

restRouter.route('/:id').delete(async (req, response) => {

    const { id } = req.params
        await Restaurant.findByIdAndDelete(id)
        .then(res => {
            response.json(res)
        })
    
    })  

module.exports = restRouter 
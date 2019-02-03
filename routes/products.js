const router = require('express').Router()
const Product = require('../models/Products')

//lista
router.get('/',(req, res)=>{
  Product.find({inStock:true})
    .then(products=>{
      res.render('products/list',{products})
    }).catch(e=>res.render('error'))
})

//detalle
router.get('/detail/:productId', (req,res) => {
    Product.findById(req.params.productId)
    .then(product => {
        res.render('products/detail', product)
    }).catch(e=>res.render('error'))
})

//formulario
router.get('/new', (req, res)=>{
  res.render('products/form')
})

router.get('/cart', (req,res) => {
  req.render('products/cart')
})

router.post('/new',(req, res) => {
  console.log(req.body)
  Product.create(req.body)
    .then(product=>{
      res.redirect('/products')
    }).catch(e=>res.render('error'))
})

// Nuevas rutas 
router.post('/new', (req, res) => {
  console.log(req.body)
  const newProduct = new Product(req.body)
  req.body.inOffer === 'on' ? newProduct.inOffer = true : null
  req.body.inStock === 'on' ? newProduct.inStock = true : null
  newProduct.save()
    .then(product=> {
      res.redirect('/products/')
    })
    .catch(err=>res.render('error'))
})

router.post('/search', (req, res) => {
  console.log(req.body)
  Product.find({name: {$regex: req.body.search, $options: "i"}})
    .then((products)=>{
      console.log(products)
      res.render('products/list', {products, search: true, searched: req.body.search})
    })
    .catch((err)=>console.log(err))
})

router.post('/filter_by', (req, res) => {
  Product.find({category: req.body.category})
    .then((products)=>res.render('products/list', {products, filter: true, filtered: req.body.category}))
})

module.exports = router
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

router.post('/new',(req, res)=>{
  console.log(req.body)
  Product.create(req.body)
    .then(product=>{
      res.redirect('/products')
    }).catch(e=>res.render('error'))
})

//update
router.post('detail/:productId/update', (req,res) => {
  Product.findByIdAndUpdate(req.params.productId, {$set: req.body}, {new: true})
    .then(product => {
      console.log(product);
      res.redirect(`/products`);
      // res.redirect('back')
    }).catch(e=>res.render('error'))
});

//remove
router.post('/product/:productId', (req,res) => {
  Product.findByIdAndRemove(req.params.productId)
  .then(product => {
      req.redirect('products', product)
  }).catch(e=>res.render('error'))
})

module.exports = router
const { Router } = require('express')
const router = Router()


//router.get('/', (req,res,next) => {next()})

// router.get('/proyecto',(req,res,next) => {
//   res.redirect('/')
//    next()
//   })

router.get('/contacto',(req,res,next) => {
  res.send('otra')
  next()})


module.exports = router

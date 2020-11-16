const apiErrorHandler = (error, req, res, next) => {
  console.log('Errorss handler Api ', error);

  if(error.name==='Form Validation Error'){ // Error por validaciones de Formularios
    return res.status(error.status).json(error)
  }else{
    return res.status(500).json({
      name: 'Server error',
      messagge: 'Something Went Wrong'
    })
  }
  
  
}

module.exports = apiErrorHandler

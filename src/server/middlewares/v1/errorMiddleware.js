const apiErrorHandler = (error, req, res, next) => {
  //console.log('Error Middleware ', error);
  req.log.error(`ERROR MIDDLEWARE: `);
  for (const e in error) {
    req.log.error(`${e}: ${error[e]}`);
  }
 
  if(error.name==='Form Validation Error'){ // Error por validaciones de Formularios
    return res.status(error.status).json(error)
  }else{
    return res.status(500).json({
      name: 'Server error',
      messagge: 'Something Went Wrong M'
    })
  }
  
  
}

module.exports = apiErrorHandler

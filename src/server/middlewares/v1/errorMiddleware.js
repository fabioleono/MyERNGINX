const apiError = (error, req, res, next) => {
  //console.log('Error Middleware ', error);
  req.log.error(`ERROR MIDDLEWARE: ${error}`);
  for (const e in error) {
    req.log.error(`${e}: ${error[e]}`);
  }
  const { name, status }= error
  // console.log('name Error', name);
  //  console.log('status Error', status);
  if (name === "Form Validation Error") {
    return res.status(status).json(error); // Error por validaciones de Formularios
  } else if (name === "Rate Limit Error") {
    return res.status(status).json(error); // Error por validaciones de Formularios
  } else {
    return res.status(500).json({
      name: "Server error",
      messagge: "Something Went Wrong Mi",
    });
  }
  
  
}

module.exports = apiError

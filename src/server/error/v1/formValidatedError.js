//const { consumeRateLimit } = require('../../controllers/v1/rateLimiter')
class FormError extends Error {
  constructor(error){
   //console.log('ERROR CLASE VALIDATED FORM ', error);
    super()
    this.ip = error.ip;
    // this.user = error.user;
    this.name = 'Form Validation Error';
    this.status = 400;
    this.message = error.message;
    this.path = error.path;
    if(error.process){ // Trae un error de procedimiento
      this.process = error.process;
    }else{
      this.process = 0;
    }
  }

  toJson(){
    return{
      success: false,
      name: this.name,
      status: this.status,
      message: this.message,
      process: this.process,
      path: this.path
    }
  }
  
  
}

module.exports = FormError

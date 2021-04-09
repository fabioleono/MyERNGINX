class ModelError extends Error {
  constructor(error){
   //console.log('ERROR CLASE MODEL RESOURCES ', error);
    super()
    // this.ip = error.ip;
    // this.user = error.user;
    this.name = 'Model Error';
    this.status = error.status;
    this.message = error.message;
  }

  toJson(){
    return{
      success: false,
      name: this.name,
      status: this.status,
      message: this.message,
      
    }
  }
  
  
}

module.exports = ModelError

class RateLimitError extends Error {
  constructor(error){
    //console.log('ERROR CLASE RATE LIMIT ', error);
    super()
    this.name = error.name;
    this.status = error.status
    this.message = error.message
}

  toJson(){
    return{
      name: this.name,
      status: this.status,
      message: this.message,
    }
  }
  
  
}

module.exports = RateLimitError

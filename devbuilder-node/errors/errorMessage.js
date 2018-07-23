const Error = function(message, description, code) {

  this.message = message;
  this.desctiption = description;
  this.code = code;

  return {
    message: this.message,
    desctiption: this.description,
    code: this.code
  }
}

module.exports = Error;
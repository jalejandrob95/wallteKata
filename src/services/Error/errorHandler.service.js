class CustomError {
  constructor(message, status, additionInfo) {
    this.message = message;
    this.status = status || 500;
    this.additionalInfo = additionInfo;
  }
}

module.exports = CustomError;

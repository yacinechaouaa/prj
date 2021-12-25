// ken tsir ghalta fl async ki njareb al postman yebqa ydour w mayaatni hata response
module.exports = (func) => (req, res, next) =>
  Promise.resolve(func(req, res, next)).catch(next); // passing error to the next


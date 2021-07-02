const jwt = require('jsonwebtoken');

exports.verToken = function (token) {
  return new Promise((resolve, reject) => {
    let userInfo = jwt.verify(token.split(' ')[1], 'lpwq 1225')
    resolve(userInfo)
    console.log(userInfo)
  }).catch(err => {
    console.log(err)
  })
}
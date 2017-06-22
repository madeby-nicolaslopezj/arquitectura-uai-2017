'use strict'
const {getData} = require('./getData')
const {newData} = require('./newData')
const {MongoClient} = require('mongodb')

const mongoURL = 'mongodb://uai:uai123@ds133932.mlab.com:33932/arquitecturauai'

const run = function (func, event, context, callback) {
  MongoClient.connect(mongoURL, function (error, db) {
    if (error) {
      return callback(error)
    }
    try {
      const result = func(event, context, db)
      Promise.resolve(result).then(function (response) {
        callback(null, {
          statusCode: 200,
          headers: {
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify(response, null, 2)
        })
        db.close()
      }).catch(function (error) {
        callback(error, {
          statusCode: 500,
          headers: {
            'Access-Control-Allow-Origin': '*'
          },
          body: error.message
        })
        db.close()
      })
    } catch (error) {
      callback(error, {
        statusCode: 500,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        body: error.message
      })
      db.close()
    }
  })
}

module.exports.getData = (event, context, callback) => run(getData, event, context, callback)
module.exports.newData = (event, context, callback) => run(newData, event, context, callback)

const AWS = require('aws-sdk')
const converterApiKey = 'UAflRPla01K8A9wPqoTsEDy4jWCS7-Y-v7j22VZHr6ZUyCelAgURRTua-s1voQJ3ZpYjQvjvX9RNJIYpcaM7tA'
const cloudconvert = new (require('cloudconvert'))(converterApiKey)

const rekognition = new AWS.Rekognition({
  accessKeyId: 'AKIAJS7UGSPYB23P2XMA',
  secretAccessKey: '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',
  region: 'us-east-1'
})

module.exports.detect = function (event, context, db) {
  const base64 = event.body

  cloudconvert.createProcess({
    inputformat: 'flv',
    outputformat: 'mp4'
  }, function (process) {
    process.start({
      'input': 'download',
      'file': 'http://url/to/my/file.ext',
      'outputformat': 'mp3',
      'converteroptions': {
        'audio_bitrate': 128,
        'audio_normalize': '+20db'
      }
    })
  })

  const params = {
    Image: {
      Bytes: base64
    },
    Attributes: ['ALL']
  }
  return rekognition.detectFaces(params).promise()
}

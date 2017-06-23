module.exports.getData = function (event, context, db) {
  const Points = db.collection('points')
  return Points.find({}).sort({date: -1}).limit(200).toArray()
}

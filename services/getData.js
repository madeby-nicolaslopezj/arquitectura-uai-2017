module.exports.getData = function (event, context, db) {
  const Points = db.getCollection('points')
  const items = Points.find().sort({date: -1}).limit(200).toArray()
  return items
}

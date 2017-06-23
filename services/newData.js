module.exports.newData = function (event, context, db) {
  const Points = db.collection('points')
  const items = JSON.parse(event.body)
  for (const item of items) {
    item.date = new Date()
    Points.insert(item)
  }
  return items
}

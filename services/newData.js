module.exports.newData = function (event, context, db) {
  const Points = db.getCollection('points')
  const items = JSON.parse(event.body)
  for (const item of items) {
    Points.insert({
      date: new Date(),
      ...item
    })
  }
  return items
}

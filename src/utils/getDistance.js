export default function getDistance (pos1, pos2) {
  if (pos1 == null || pos2 == null) {
    return null
  }

  var R = 6371e3 // metres
  var phi1 = pos1.lat * (Math.PI / 180)
  var phi2 = pos2.lat * (Math.PI / 180)
  var deltaPhi = (pos2.lat - pos1.lat) * (Math.PI / 180)
  var deltaLambda = (pos2.lng - pos1.lng) * (Math.PI / 180)

  var a = Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
          Math.cos(phi1) * Math.cos(phi2) *
          Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2)
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return Math.round((R * c) / 1000, 2)
}

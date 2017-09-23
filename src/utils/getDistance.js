export default function getDistance(pos1, pos2) {
  var R = 6371e3; // metres
  var phi1 = pos1[0] * (Math.PI/180);
  var phi2 = pos2[0] * (Math.PI/180);
  var delta_phi = (pos2[0]-pos1[0]) * (Math.PI/180);
  var delta_lambda = (pos2[1]-pos1[1]) * (Math.PI/180);

  var a = Math.sin(delta_phi/2) * Math.sin(delta_phi/2) +
          Math.cos(phi1) * Math.cos(phi2) *
          Math.sin(delta_lambda/2) * Math.sin(delta_lambda/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  return Math.round((R * c) / 1000, 2);
}

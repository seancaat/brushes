var width = window.innerWidth;
var height = window.innerHeight;
var vertical = (width < height) ? true : false;

var mid = {x: width /2, y: height / 2};

tool.minDistance = 144;

var path = new Path();
path.strokeWidth = 5;
path.strokeCap = 'round';
path.strokeColor = '#0B0A0F';
path.dashArray = [100, 144];

// var colors = [
//   '#0B0A0F'
//   // '#610635', '#325b06', '#065e5a', '#5b1a06' //near-black
  
// ]

var colors = [
  'rgb(236,112,99)',
  'rgb(155,96,52)',
  'rgb(245,189,75)',
  'rgb(231,231,130)',
  'rgb(234,240,183)',
  'rgb(173,213,167)',
  'rgb(106,183,128)',
  'rgb(109,191,137)',
  'rgb(34,95,62)',
  'rgb(124,199,177)',
  'rgb(106,188,204)',
  'rgb(131,207,240)',
  'rgb(184,209,236)',
  'rgb(62,88,167)',
  'rgb(212,175,207)',
  'rgb(245,219,234)',
  'rgb(250,190,208)',
  'rgb(245,287,203)',
  'rgb(211,3,34)',
  'rgb(90,86,88)',
  'rgb(113,113,113)',
  'rgb(202,202,202)',
];

var lil_fib = [5, 8, 13];

var big_fib = [5, 8, 13, 21, 34];

function onMouseDown(event) {
  for(var i = 0; i < randof(lil_fib); i++) {
    var pt = pointInCircle(5 * randof(big_fib));

    path.add(event.point + pt);
    path.simplify();
    path.smooth({ type: 'catmull-rom', factor: 0.0 });
  }

  // var c2 = new Path.Circle(new Point(event.point.y, Math.random() * width), Math.floor(Math.random() * 90));
  // c2.fillColor = randof(colors);
  // c2.strokeColor = '#0B0A0F';
  // c2.strokeWidth = 3;

  // if(Math.random() < 0.49) {
  //   c2.insertBelow(path)
  // } else {
  //   c2.shadowColor = 'rgb(0,0,0,0.5)';
  //   c2.shadowBlur = randof(lil_fib);
  //   c2.shadowOffset = new Point(2,2);
  // }
}

function onMouseDrag(event) {
  for(var i = 0; i < randof(lil_fib); i++) {
    var pt = pointInCircle(5 * randof(big_fib));

    path.add(event.point + pt);
    path.simplify();
    path.smooth({ type: 'catmull-rom', factor: 1.0 });
  }

  // var c1 = new Path.Circle(new Point(event.point.x, Math.random() * height), Math.floor(Math.random() * 90));
  // c1.fillColor = randof(colors);
  // c1.strokeColor = '#0B0A0F';
  // c1.strokeWidth = 3;

  // for(var i = 0; i < c1.segments.length; i++) {
  //   c1.segments[i].point.x += i * Math.random() * 5;
  //   c1.segments[i].point.y -= i * Math.random() * 5;
  // }

  // if(Math.random() < 0.49) {
  //   c1.insertBelow(path)
  // } else {
  //     c1.shadowColor = 'rgb(0,0,0,0.5)';
  //     c1.shadowBlur = randof(lil_fib);
  //     c1.shadowOffset = new Point(2,2);
  // }

}

function onMouseUp(event) {
  
}

function onFrame(event) {
  for(var i = 0; i < path.segments.length; i++) {

    path.segments[i].point.x += 1.5 * Math.sin(0.03 *  event.time * i);
    path.segments[i].point.y += 0.5 * Math.cos(0.05 *  event.time * i);

    path.segments[i].handleIn += 0.52 * Math.random() * Math.cos(8 *  event.time + randof(big_fib) * i);
    // path.segments[i].handleOut += 0.307 * Math.random() * Math.sin(13 *  event.time + randof(big_fib) * i);
  }
}


function pointInCircle(n) {
  // n is the radius
  var u = Math.random();
  var v = Math.random();

  var theta = u * 2.0 * Math.PI;
  var phi = Math.acos(2.0 * v - 1.0);
  var r = Math.cbrt(Math.random());

  var x = r * Math.sin(phi) * Math.cos(theta);
  var y = r * Math.sin(phi) * Math.sin(theta);

  return new Point(n * x, n * y);
}

function randof(array) {
  return array[Math.floor(Math.random() * array.length)];
}
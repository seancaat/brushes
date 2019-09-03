var width = window.innerWidth;
var height = window.innerHeight;
var vertical = (width < height) ? true : false;

var mid = {x: width /2, y: height / 2};

tool.minDistance = 144;

var path = new Path();
path.strokeWidth = 2;
path.strokeColor = '#0B0A0F';

var colors = [
  'black'
  // '#610635', '#325b06', '#065e5a', '#5b1a06' //near-black
]

var fib = [5, 8, 13, 21, 34, 55];

function onMouseDown(event) {
  for(var i = 0; i < randof(fib); i++) {
    var pt = pointInCircle(5 * randof(fib));

    path.add(event.point + pt);
    path.smooth({ type: 'continuous' });
  }
}

function onMouseDrag(event) {
  for(var i = 0; i < randof(fib); i++) {
    var pt = pointInCircle(5 * randof(fib));

    path.add(event.point + pt);
    path.smooth({ type: 'continuous' });
  }
}

function onMouseUp(event) {

}

function onFrame(event) {
  for(var i = 0; i < path.segments.length; i++) {

    path.segments[i].point.x += 0.1308 * Math.random() * Math.sin(0.3 *  event.time + randof(fib) * i);
    path.segments[i].point.y += 0.081 * Math.random() * Math.cos(0.5 *  event.time + randof(fib) * i);

    path.segments[i].handleIn += 0.52 * Math.random() * Math.cos(8 *  event.time + randof(fib) * i);
    path.segments[i].handleOut += 0.307 * Math.random() * Math.sin(13 *  event.time + randof(fib) * i);
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
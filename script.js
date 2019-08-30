var width = window.innerWidth;
var height = window.innerHeight;
var vertical = (width < height) ? true : false;

var mid = {x: width /2, y: height / 2};

tool.minDistance = 15;
tool.maxDistance = 20;

var path;

var colors = [
  // 'rgb(110, 189, 168)', // green
  // 'rgb(118, 80, 152)', // purple
  // 'rgb(241, 224, 82)', // yellow
  // 'rgb(223, 104,	63)' // red
  // '#FF0000', // cutting red
  // '#00ff00',
  // '#0000ff',
  // '#ff8000'
  // 'black',
"#2A40D4","#FF6F55", "#F9F04D"  // triadic 
  // '#0095cd','#1d94c0', '#3692b4', '#4b8fa7', // blues
  // '#008e50','#138151', '#237551', '#2f684f' // greens
]

function randof(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// var c = new Path.Circle(0, 0, 0)

var circles = [];
// make bigger and bigger flowers 
// start off smmall, grow slow, the explode big. this will be a function of event.count of drag
function makeFlower(x, y, size, radiusFactor, petalSizes) {

  for (var i = 0; i < size; i++) {
    var angle = (i) * 137.5;
    var radius = radiusFactor * Math.sqrt(i);
    // can I somehow make it so that event.posiiton of a drag is always the x, y that gets passed?
    var coords = polarToCartesian(x, y, radius, angle); 

    //place something at coords
    var c = new Path.Circle(new Point(coords.x, coords.y), petalSizes);

    c.fillColor = {
      gradient: {
        stops: [randof(colors), randof(colors)]
      },
      origin: c.bounds.topLeft,
      destination: c.bounds.bottomRight
    };

    circles.push(c);

  }

  function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;
  
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  }
}

function onMouseDown(event) {
  
}

function onMouseDrag(event) {
  // makeFlower(x, y, number of petals, radiusFactor, petalSizes)
  makeFlower(event.point.x, event.point.y, event.count /2, event.count / 4 , event.count/1.5);

}


function onMouseUp(event) {
//   console.log(circles)
//   for(var i = 0; i < circles.length; i++) {
//     circles[i].pivot = event.point;
//     circles[i].applyMatrix = false;
//     circles[i].tween({ro}, {easing: cubicInOut, duration: 500}); 
//   }
}

function onFrame(event) {
}
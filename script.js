var width = window.innerWidth;
var height = window.innerHeight;
var vertical = (width < height) ? true : false;

var mid = {x: width /2, y: height / 2};

tool.minDistance = 10;
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
// "#2A40D4","#FF6F55", // "#F9F04D"  // triadic 
  // '#0095cd','#1d94c0', '#3692b4', '#4b8fa7' // blues
  '#008e50','#138151', '#237551', '#2f684f' // greens
]

function randof(array) {
  return array[Math.floor(Math.random() * array.length)];
}


function onMouseDown(event) {
	path = new Path();
  path.fillColor = randof(colors);
  path.shadowColor = 'rgb(0,0,0,0.25)';
  path.shadowBlur = 2; 
  // path.blendMode = 'difference';
	path.add(event.point);
}

var top;
var bottom;
var leaves = [];

function onMouseDrag(event) {
  var step = event.delta;
  console.log(step);

  
	// step.angle += 90 * step.length / tool.minDistance;
  step.angle += 90;
  
  top = event.middlePoint + 10;
  bottom = event.middlePoint - 10;


  var sizeFactor = tool.minDistance * 2;
  var minSize = sizeFactor * 2;


  var topLeaf = new Path.Ellipse({
    point: event.middlePoint - 5,
    size: [minSize + sizeFactor * Math.sin(Math.random() * event.count), event.delta.length],
    fillColor: randof(colors)
  });

  topLeaf.rotation = step.angle;

  var bottomLeaf = new Path.Ellipse({
    point: event.middlePoint + 5,
    size: [minSize + sizeFactor * Math.sin(Math.random() * event.count * 1.05), event.delta.length],
    fillColor: randof(colors)
  });
  bottomLeaf.pivot = bottomLeaf.bounds.leftCenter;
  bottomLeaf.rotation = step.angle;

  leaves.push(topLeaf);
  leaves.push(bottomLeaf);

	path.smooth();
	  
}


function onMouseUp(event) {
  top = null;
  bottom = null;
  
  // console.log(path.segments)
}

function onFrame(event) {
  if (path) {
    for(var i = 0; i < leaves.length; i++) {
      leaves[i].rotation += 0.5 * Math.sin(Math.cos(event.time + i) / 10 + i)  * 0.5 * Math.cos(event.time / 20) * Math.sin(2.5 * event.time + i);;
    }
  }
  
}
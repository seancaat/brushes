var width = window.innerWidth;
var height = window.innerHeight;
var vertical = (width < height) ? true : false;

var mid = {x: width /2, y: height / 2};

tool.minDistance = 5;
tool.maxDistance = 60;

var path;

var colors = [
  // 'rgb(110, 189, 168)', // green
  // 'rgb(118, 80, 152)', // purple
  // 'rgb(241, 224, 82)', // yellow
  // 'rgb(223, 104,	63)' // red
  // '#FF0000',
  // '#00ff00',
  // '#0000ff',
  // '#ff8000'
  // 'black'
// "#2A40D4",
"#FF6F55",
// "#F9F04D"
]

function randof(array) {
  return array[Math.floor(Math.random() * array.length)];
}


function onMouseDown(event) {
	path = new Path();
  path.fillColor = randof(colors);
  // path.shadowColor = 'rgb(0,0,0,0.25)';
  // path.shadowBlur = 4; 
  path.blendMode = 'difference';
	path.add(event.point);
}

var top;
var bottom;

function onMouseDrag(event) {
  console.log(event.count)
  var step = event.delta;
  
	// step.angle += 90 * step.length / tool.minDistance;
  step.angle += 90;
  
  top = event.middlePoint + 30;
  bottom = event.middlePoint - 30;

  // top = event.middlePoint + 50 * Math.sin(event.count);
	// top = event.middlePoint + 50 * Math.sin(event.count) * Math.sin(event.count);  
	// bottom = event.middlePoint + 50 * Math.sin((event.count + 0.5)) ;

  path.add(top);
	path.insert(0, bottom);

	path.smooth();
	  
}


function onMouseUp(event) {
  top = null;
  bottom = null;
  
  // console.log(path.segments)
}

function onFrame(event) {
  if (path) {
    for(var i = 0; i < path.segments.length; i++) {
      path.segments[i].handleIn.x += 2 * Math.cos(3 * Math.sin(event.time + i));
      path.segments[i].handleOut.x += 2 * Math.sin(event.time);
    }
  }
  
}
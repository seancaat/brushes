var width = window.innerWidth;
var height = window.innerHeight;
var vertical = (width < height) ? true : false;

var mid = {x: width /2, y: height / 2};

tool.minDistance = 15;
tool.maxDistance = 45;

var path;
var topline;

function onMouseDown(event) {
	path = new Path();
	// path.fillColor = '#00000';
	path.add(event.point);
  
  topline = new Path();
  topline.strokeColor = 'beige';
  topline.strokeWidth = 2;
  topline.add(event.point);
}


var line;

var top;
var bottom;
var prevTop;
var prevBottom;

function onMouseDrag(event) {

  var step = event.delta;
  
  // console.log(step.length  / tool.minDistance);
	// step.angle += 90 * step.length / tool.minDistance;
  step.angle += 90;

  prevTop = top;
  prevBottom = bottom;
  
  console.log(prevTop);
  console.log(prevBottom);
  
	top = event.middlePoint + step;
	bottom = event.middlePoint - step;
  
	line = new Path();
	// line.selected = true;
	line.add(top);
	line.add(bottom);
  
  
  var trapezoid = new Path();
  trapezoid.add(top);
  trapezoid.add(prevTop);
  trapezoid.add(prevBottom);
  trapezoid.add(bottom);
  
  trapezoid.fillColor = 'white';
  trapezoid.shadowColor = 'rgb(0,0,0,0.25)';
  trapezoid.shadowBlur = 4;
  trapezoid.smooth();
  
  // topline.add(top);
  // topline.smooth();

  path.add(top);
	path.insert(0, bottom);

	path.smooth();
	
  
}







function onMouseUp(event) {
  top = null;
	bottom = null;
//   prevBottom = null;
//   prevTop = null;
}
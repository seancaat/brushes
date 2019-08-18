var width = window.innerWidth;
var height = window.innerHeight;
var vertical = (width < height) ? true : false;

var mid = {x: width /2, y: height / 2};

function onMouseDown(event) {

}

tool.minDistance = 15;
tool.maxDistance = 45;

var path;
var topline;

function onMouseDown(event) {
	path = new Path();
	path.fillColor = '#00000';
	path.add(event.point);
  
  topline = new Path();
  topline.strokeColor = 'beige';
  topline.strokeWidth = 2;
  topline.add(event.point);
}

function onMouseDrag(event) {

  var step = event.delta;
  
  console.log(step.length  / tool.minDistance);
	step.angle += 90 * step.length / tool.minDistance;

	var top = event.middlePoint + step;
	var bottom = event.middlePoint - step;
	
  // skeleton
	// var line = new Path();
	// line.selected = true;
	// line.add(top);
	// line.add(bottom);
  
  topline.add(top);
  topline.smooth();

  path.add(top);
	path.insert(0, bottom);

	path.smooth();
	
  
}







function onMouseUp(event) {
	
}
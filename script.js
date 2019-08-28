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

function makeLeafSymbols(colorArray) {
  var arr = [];

  for(var i = 0; i < colorArray.length; i++) {
    var ellipse = new Path.Ellipse({
      point: [0, 0],
      size: [15, 15],
      fillColor: colorArray[i]
    });

    var leaf = new SymbolDefinition(ellipse);

    arr.push(leaf);
  }

  return arr;

}

var leafSymbols = makeLeafSymbols(colors);
var leaves = [];

function onMouseDrag(event) {
  var step = event.delta;
  step.angle += 90;

  var topLeaf = randof(leafSymbols).place(event.middlePoint);
  topLeaf.scale(3 + 1.5 * Math.sin(Math.random() * event.count * 1.05), event.delta.length / 15, event.middlePoint + 8);
  topLeaf.rotate(step.angle, event.middlePoint - 2.5);

  var bottomLeaf = randof(leafSymbols).place(event.middlePoint);
  bottomLeaf.scale(3 + 1.5 * Math.sin(Math.random() * event.count), event.delta.length / 15, event.middlePoint - 8);
  bottomLeaf.rotate(step.angle, event.middlePoint + 2.5);

  leaves.push(topLeaf);
  leaves.push(bottomLeaf);

	// path.smooth();
	  
}


function onMouseUp(event) {
  top = null;
  bottom = null;
}

function onFrame(event) {
  if (path) {
    for(var i = 0; i < leaves.length; i++) {
      leaves[i].position.x += 0.037 * Math.cos(1.03 * event.time * Math.sin(i));
      leaves[i].position.y += 0.05 * Math.cos(event.time * Math.sin(i));
      leaves[i].rotate(0.2 * Math.sin(2 * event.time + i))
    }
  }
  
}
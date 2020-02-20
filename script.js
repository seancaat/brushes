var width = window.innerWidth;
var height = window.innerHeight;
var vertical = (width < height) ? true : false;

var mid = {x: width / 2, y: height / 2};

var bg = new Path.Rectangle(new Point(0,0), new Point(width, height));
bg.fillColor = "#F7F4EF";


console.log(document.body);

tool.minDistance = 2;

var path = new Path();
path.strokeWidth = 3;
path.strokeCap = 'round';
path.strokeColor = '#0B0A0F';

var colors = [
"#EB5757",
"#F2994A",
"#F2C94C",
"#219653",
"#27AE60",
"#6FCF97",
"#2F80ED",
"#2D9CDB",
"#56CCF2",
"#9B51E0",
"#BB6BD9"
];

var from;
var to;

//all change size when click?

var pts = [];

var rect = new Path.Rectangle();
rect.strokeColor = "rgb(0,0,0)";
rect.strokeWidth = 1;

var shapes = [];

function onMouseDown(event) {
  from = event.point;
}

function onMouseDrag(event) {
  if(rect) {
    rect.remove();
  }

  to = event.point;
  rect = new Path.Rectangle(from, to);
  rect.selected = true; 
}

function onMouseUp(event) {

  // var fill = randof(colors);
  // rect.fillColor = fill;
  
  rect.shadowColor = "rgba(0,0,0,0.25)";
  rect.shadowBlur = 4 + Math.random() * 20;
  rect.shadowOffset = new Point(Math.random() * 20, Math.random() * 20);
  
  var rand = Math.random();

  if (rand < 0.5) {
    rect.fillColor = {
        gradient: {
          stops: [randof(colors), randof(colors)],
        },
        origin: rect.bounds.leftCenter,
        destination: rect.bounds.rightCenter
    }
    console.log(rect.fillColor.destination);
    
  } else {
    
    rect.fillColor = {
        gradient: {
          stops: [randof(colors), randof(colors)],
        },
        origin: rect.bounds.bottomCenter - new Point(0, 3),
        destination: rect.bounds.bottomCenter - new Point (0, Math.random() * height)
    }
    rect.shadowColor = "rgba(0,0,0,0)";
    console.log(rect.fillColor.destination);
    
  }
  
  if (rand > 0.75) {
    rect.blendMode = 'multiply'
  }


  rect.selected = false;
  shapes.push(rect);
  
  
  if(shapes.length > 1) {
    for(var i = 0; i < shapes.length; i++) {
      shapes[i].tween({ 
        'bounds.width': shapes[i].bounds.width + 10 * Math.sin(100 * Math.random()),
        'bounds.height': shapes[i].bounds.height + 10 * Math.sin(100 * Math.random()),
        'position.x': shapes[i].position.x + 10 * Math.sin(100 * Math.random()),
        'position.y': shapes[i].position.y + 10 * Math.sin(100 * Math.random())
      }, {easing: 'easeOutCubic', duration: 250});
      shapes[i].fillColor.gradient.stops = [randof(colors), randof(colors)];
    }
  }
  
  
  rect = new Path.Rectangle();
  
}

function onFrame(event) {

}


function pointInCircle(dist) {
  var u = Math.random();
  var v = Math.random();

  var theta = u * 2.0 * Math.PI;
  var phi = Math.acos(2.0 * v - 1.0);
  var r = Math.cbrt(Math.random());

  var x = r * Math.sin(phi) * Math.cos(theta);
  var y = r * Math.sin(phi) * Math.sin(theta);

  return new Point(dist * x, dist * y);
}

function randof(array) {
  return array[Math.floor(Math.random() * array.length)];
}


// save to image
document.querySelector(".save").onclick = function() {
  var canvas = document.getElementById("myCanvas");
  var img = canvas.toDataURL("image/jpg");
  
  var el = document.createElement('img');
  el.setAttribute("src", img);
  el.style.width = width / 2 + "px";
  el.style.boxShadow = "2px 2px 6px rgba(0,0,0,0.25)";
  el.style.position = "fixed";
  el.style.left = width / 4 + "px";
  el.style.top = height / 5 + "px";
  el.style.zIndex = 10;
  
  document.body.appendChild(el);
  
  canvas.style.filter = "blur(40px)";
}
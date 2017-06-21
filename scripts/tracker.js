var components = [];

/**
* Just a call function to generate the canvas element.
*/
function startTracker(){
  components.push(new component(64, 64, "media/img/vanilla/flute.png", 10, 120, "image"));
  document.onmousedown = checkCollision;
  trackerArea.start();
  updateTracker(0);
}

/*
* Main tracker element. Contains functions for various operations such as start up and updates.
*/
var trackerArea = {
  canvas: document.createElement("canvas"),
  start: function(){
     this.canvas.width = 320;
     this.canvas.height = 384;
     this.context = this.canvas.getContext ("2d");
     document.body.insertBefore(this.canvas, document.body.childNodes[0]);
  },
  clear : function() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

/**
* Constructor for components, the catch-all object.
* width - width of the object
* height - height of the object
* path - path to image OR the solid color fill hex
* x - the x position of the object
* y - the y position of the object
* type - what type of object this will be
*/
function component(width, height, content, x, y, type){
  this.type = type;
  if(type == "image"){
    this.image = new Image();
    this.image.src = content;
  }
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.obtained = false;
  //(Re)Draws the component
  this.update = function(){
    ctx = trackerArea.context;
    if (type == "image"){
      if(this.obtained){
        ctx.globalAlpha = 1;
      }else {
        ctx.globalAlpha = 0.5;
      }
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    } else {
      ctx.fillStyle = content;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }
}

/**
* Handles the call to update the tracker.
*/
function updateTracker(i) {
  //Clear the tracker first.
  trackerArea.clear();
  components[i].update();
}

/**
* Checks if the mouse click actually collided with a component.
* @param e - The mouse click event.
*/
function checkCollision(e){
  var mouse = {x: 0, y: 0};
  if(e.layerX || e.layerX == 0){
    mouse.x = e.layerX - trackerArea.canvas.offsetLeft;
    mouse.y = e.layerY - trackerArea.canvas.offsetTop;
  } else if(e.offsetX || e.offsetX == 0){
    mouse.x = e.offsetX - trackerArea.canvas.offsetLeft;
    mouse.y = e.offsetY - trackerArea.canvas.offsetTop;
  }
  //Loop through all the components
  for(var i = 0; i <= components.length - 1; i++){
    if(mouse.x > components[i].x && mouse.x < components[i].x + components[i].width && mouse.y > components[i].y && mouse.y < components[i].y + components[i].height){
      components[i].obtained = !components[i].obtained; //TODO Handle multi-progression items
      updateTracker(i);
    }
  }
}

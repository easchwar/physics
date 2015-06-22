var PhysicalObject = require('./physicalObject.js');

function World(timeStep) {
  this.time = 0;
  this.timeStep = timeStep || 1000;
  this.objects = [];
}

World.prototype.start = function() {
  console.log(this);
  setInterval(this.step.bind(this), this.timeStep);
};

World.prototype.step = function() {
  this.time += this.timeStep;
  console.log(this.time);
  this.collideObjects();
};

World.prototype.collideObjects = function() {
  for (var i = 0, l = this.objects.length; i < l; i ++) {
    var v = this.objects[i];
    for (var j = i + 1; j < l; j++) {
      if (v.collided(this.objects[j])) {
        v.collideWith(this.objects[j]); 
      }
    }
  }
};

w = new World(1000);

w.start();

module.exports = World;

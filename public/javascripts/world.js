(function() {

  window.Physics = window.Physics || {};

  var World = window.Physics.World = function(timeStep) {
    this.time = 0;
    this.timeStep = timeStep || 100;
    this.objects = [];
  };

  World.DIM_X = 800;
  World.DIM_Y = 600;
  World.BG_COLOR = "#ffffff";
  
  World.prototype.start = function() {
    setInterval(this.step.bind(this), this.timeStep);
  };

  World.prototype.step = function() {
    this.time += this.timeStep;
    this.collideObjects();
  };

  World.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, World.DIM_X, World.DIM_Y);
    ctx.fillStyle = World.BG_COLOR;
    ctx.fillRect(0, 0, World.DIM_X, World.DIM_Y);

    this.objects.forEach(function (object) {
      object.draw(ctx);
    });
  };

  World.prototype.wrap = function(pos) {
    pos[0] = pos[0] > World.DIM_X ? pos[0] - World.DIM_X : pos[0];
    pos[0] = pos[0] < 0           ? pos[0] + World.DIM_X : pos[0];
    pos[1] = pos[1] > World.DIM_Y ? pos[1] - World.DIM_Y : pos[1];
    pos[1] = pos[1] < 0           ? pos[1] + World.DIM_Y : pos[1];
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

})();

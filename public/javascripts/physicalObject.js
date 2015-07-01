(function() {

  var Physics = window.Physics || {};
  var Util = window.Physics.Util;

  var PhysicalObject = window.Physics.PhysicalObject = function(options) {
    options = options || {};
    this.pos = options.pos || [0,0]; 
    this.vel = options.vel || [0,0];
    this.acc = options.acc || [0,0];
    this.velUpdate = [0,0];
    this.mass = options.mass || 1;
    this.radius = options.radius || 1;
    this.elasticity = options.elasticity || 1;
  };

  PhysicalObject.prototype.update = function(step) {
    this.velUpdate = Util.sum(this.velUpdate, Util.multiply(this.accel, step));
    this.vel = Util.sum(this.vel, this.velUpdate);
    this.velUpdate = [0,0];
    this.pos = Util.sum(this.pos, Util.multiply(this.vel, step));
  };

  PhysicalObject.prototype.applyForce = function(force) {
  };

  // used velUpdate in an attempt to simplify the world's collision logic. We'll see if
  // it ends up being a good decision
  PhysicalObject.prototype.collideWith = function(obj) {
    // get relative velocity between two bodies (i.e. use reference frame where 'obj' is stationary)
    var velRelative = Util.subtract(this.vel, obj.vel);

    // resultant force is applied normal to collision surface (along line connecting centers in circular 2D bodies)
    var posDiff= Util.subtract(obj.pos, this.pos);
    var resultantForceDir = Util.normalize(posDiff);

    // get portion of relative velocity in the direction of the resultant force vector. Basis for all resultant velocity calcs
    var vInitialMag = Util.dot(velRelative,resultantForceDir); 

    // find velocity difference before and after collision (Vf - Vi) of `this` 

    // equation to determine change in velocity
    var massRatio = this.mass / obj.mass;
    var resVelMag = vInitialMag * ((massRatio - 1)/(1 + massRatio) - 1);
    var resVel = Util.multiply(resultantForceDir, resVelMag);

    // add this resultant velocity to the velUpdate for next update cycle
    this.velUpdate = Util.sum(this.velUpdate, resVel);
  };

  PhysicalObject.prototype.draw = function (ctx) {
    ctx.fillStyle = "#000000";

    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
    );
    ctx.fill();
  };
})();

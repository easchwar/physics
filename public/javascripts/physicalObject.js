var Util = require('./util.js');

function PhysicalObject(options) {
  options = options || {};
  this.pos = options.pos || [0,0]; 
  this.vel = options.vel || [0,0];
  this.acc = options.acc || [0,0];
  this.mass = options.mass || 1;
  this.radius = options.radius || 1;
  this.elasticity = options.elasticity || 1;
}

PhysicalObject.prototype.update = function(step) {
  this.velUpdate = Util.sum(this.velUpdate, Util.multiply(this.accel, step));
  this.vel = Util.sum(this.vel, this.velUpdate);
  this.velUpdate = [0,0];
  this.pos = Util.sum(this.pos, Util.multiply(this.vel, step));
};

PhysicalObject.prototype.applyForce = function(force) {
};

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

p1 = new PhysicalObject({pos: [1,1], vel: [-2,0]});
p2 = new PhysicalObject();

console.log(p1);
console.log(p2);

p1.collideWith(p2);
console.log(p1);
console.log(p2);
module.exports = PhysicalObject;

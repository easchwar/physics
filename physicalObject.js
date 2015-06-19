var Util = require('./util.js');
function PhysicalObject(options) {
  options = options || {};
  this.pos = options.pos || [0,0]; 
  this.vel = options.vel || [0,0];
  this.radius = options.radius || 1;
  this.elasticity = options.elasticity || 1;
}

PhysicalObject.prototype.update = function(step) {
  this.pos = Util.sum(this.pos, Util.multiply(this.vel, step));
};

PhysicalObject.prototype.collideWith = function(obj) {
  var velDiff = Util.subtract(this.vel, obj.vel);
  console.log(velDiff);
  var posDiff= Util.subtract(obj.pos, this.pos);
  console.log(posDiff);
  console.log("resultant vector");
  var resMag = Util.dot(velDiff, posDiff) / Util.magnitude(posDiff);
  console.log(resMag);
  var resVec = Util.multiply(Util.normalize(posDiff), resMag);
  console.log(resVec);

  this.vel = Util.subtract(this.vel, resVec);
  obj.vel = Util.sum(resVec, obj.vel);
};

p1 = new PhysicalObject({pos: [1,1], vel: [-2,0]});
p2 = new PhysicalObject();

console.log(p1);
console.log(p2);

p1.collideWith(p2);
console.log(p1);
console.log(p2);
module.exports = PhysicalObject;

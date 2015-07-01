(function () {
  window.Physics = window.Physics || {};
  
  var Util = window.Physics.Util = {
    distance: function(pos1, pos2) {
      var x = pos1[0] - pos2[0];
      var y = pos1[1] - pos2[1];
      return Math.sqrt(x*x + y*y);
    },

    sum: function(vec1, vec2) {
      return [vec1[0] + vec2[0], vec1[1] + vec2[1]];
    },

    subtract: function(vec1, vec2) {
      return [vec1[0] - vec2[0], vec1[1] - vec2[1]];
    },

    multiply: function(vector, scalar) {
      return [vector[0]*scalar, vector[1]*scalar];
    },

    magnitude: function(vector) {
      return Util.distance([0,0], vector);
    },

    normalize: function(vector) {
     var mag = Util.magnitude(vector);
     if (mag === 0) {
       return undefined;
     }
     return Util.multiply(vector, (1/mag));
    },

    dot: function(vec1, vec2) {
      return vec1[0] * vec2[0] + vec1[1] * vec2[1];
    },

    cross: function(vec1, vec2) {
      return vec1[0] * vec2[1] - vec1[1] * vec2[0];
    },

  };

})();

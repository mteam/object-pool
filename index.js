function ObjectPool(constructor) {
  this.constructor = constructor;
  this.pool = [];
}

ObjectPool.prototype.get = function() {
  if (this.pool.length > 0) {
    return this.pool.pop();
  } else {
    var proto = this.constructor.prototype;
    return Object.create(proto);
  }
};

ObjectPool.prototype.create = function() {
  var object = this.get();
  this.constructor.apply(object, arguments);

  return object;
};

ObjectPool.prototype.free = function(object) {
  this.pool.push(object);
};

module.exports = ObjectPool;

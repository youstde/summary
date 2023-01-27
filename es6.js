function Person(name) {
    this.name = name;
}
Person.prototype.getName = function() {
    return this.name;
}

var per = new Person('jack');
console.log(Person.prototype.__proto__.constructor.prototype === Person.prototype.__proto__)
console.log(per.prototype);
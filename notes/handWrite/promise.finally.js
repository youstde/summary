Promise.prototype.finally = function(callback) {
    const P = this.constructor;
    return this.then(
        (newValue) => P.resolve(callback()).then(() => newValue), 
        (result) => P.resolve(callback()).then(() => { throw result })
    );
}
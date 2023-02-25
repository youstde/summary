
module.exports = function({ types }) {
    return {
        visitor: {
            FunctionDeclaration(path) {
                console.log("====>", path);
                return;
            }
        }
    }
}
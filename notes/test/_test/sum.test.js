const sum = require('../sum');

describe('sum add', () => {
    test('add 123 + 321 to equal 444', () => {
        expect(sum('123', '321')).toBe('444');
    });
    test('add 99 + 1 to equal 100', () => {
        expect(sum('99', '1')).toBe('100');
    });
    test('add 1 + 999 to equal 1000', () => {
        expect(sum('1', '999')).toBe('1000');
    });
})
const fuxi = require('../fuxi.js');
const { objectCreate, myInstance, EventEmmiter, myNew, myNewTwo } = fuxi;

// objectCreate
describe('objectCreate', () => {
    test('objectCreate by object', () => {
        var parent = {
            name: 'youstde',
            age: 18,
        }
        const child = objectCreate(parent);
        expect(Object.getPrototypeOf(child)).toEqual(parent);
    });

    test('objectCreate by null', () => {
        const child = objectCreate(null);
        expect(Object.getPrototypeOf(child)).toEqual(null);
    });
});


describe('myInstance check Array', () => {
    var arr = [1,2,3];
    test('arr instanceof Array', () => {
        expect(myInstance(arr, Array)).toBe(true);
    });
    test('arr instanceof Object', () => {
        expect(myInstance(arr, Object)).toBe(true);
    });
});

describe('myInstance check Object', () => {
    var obj = {a: 1, b: 2};
    test('obj instanceof Object', () => {
        expect(myInstance(obj, Object)).toBe(true);
    });
    test('obj instanceof Array', () => {
        expect(myInstance(obj, Array)).toBe(false);
    });
});

// new
describe('new a object', () => {
    function People(name, age) {
        this.name = name;
        this.age = age;
    }
    test('check new a object', () => {
        expect(myNew(People, 'youstde', 18)).toEqual({ name: 'youstde', age: 18 });
        expect(myNewTwo(People, 'youstde', 18)).toEqual({ name: 'youstde', age: 18 });
    });
    test('check instance constructor', () => {
        expect(myNew(People, 'youstde', 18).constructor).toEqual(People);
        expect(myNewTwo(People, 'youstde', 18).constructor).toEqual(People);
    });
});

// EventEmmiter
describe('eventEmmiter', () => {
    const em = new EventEmmiter();
    const handlerFn = (eventParams) => (params) => {
        expect(params).toBe(eventParams);
    };
    test('addEvent && dispatchEvent', () => {
        const params = 'click Event';
        const onceHandler = handlerFn(params);
        em.addEventListener('click', onceHandler);
        em.dispatchEvent('click', params);
    });

    test('once && dispatchEvent', () => {
        const params = 'once params';
        const onceHandler = handlerFn(params);
        em.once('onceClick', onceHandler);
        em.dispatchEvent('onceClick', params);
        try {
            em.dispatchEvent('onceClick', params);
        } catch(err) {
            expect(err).toEqual(new Error('该事件未注册'));
        }
    });
});
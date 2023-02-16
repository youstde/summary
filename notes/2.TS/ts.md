### 联合类型
类型缩窄
```ts
function fn(id: string | number) {
    if (typeof id === string) {
        // here is string
    } else {
        // here is number
    }
}
```

### 类型别名
如果一个类型会被多个地方使用，那最好是提取出来，单独维护
```ts
type IId = string | number;

type Point = {
    id: IId;
    y: string;
}

var obj: Point = {
    id: 123,
    y: '123'
}
```
### 接口
```ts
type IId = string | number;
interface Point {
    id: IId;
    y: string;
}
var obj: Point = {
    id: 123,
    y: '123'
}
```
#### 类型和接口的区别
两者最关键的差别在于类型别名本身无法添加新的属性，而接口是可以扩展的

### 类型断言
有的时候，你知道一个值的类型，但 TypeScript 不知道。
TypeScript 仅仅允许类型断言转换为一个更加具体或者更不具体的类型。
举个例子，如果你使用 document.getElementById，TypeScript 仅仅知道它会返回一个 HTMLElement，但是你却知道，你要获取的是一个 HTMLCanvasElement。

这时，你可以使用类型断言将其指定为一个更具体的类型：
```ts
const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;
```
> 重点：因为类型断言会在编译的时候被移除掉，所以运行时并不会有类型断言的检查，即使类型断言是错误的，也不会有异常或者null产生

### 字面量类型
一般是和联合类型放在一起使用
```ts
// 比如在antd中
type IButtonType = 'base' | 'primiry' | 'ghost' | 'link';

<Button type="ghost">click</Button>
```

### 枚举 - Enums
```ts
// 数字类枚举 - 面试题： 默认从0️⃣开始，依次递增
enum Score {
    BAD,
    NG,
    GOOD,
    PERFECT,
}
let score: Score = Score.GOOD;

// 字符串类枚举
enum Score {
    BAD = 'BAD',
    NG = 'NG',
    GOOD = 'GOOD',
    PERFECT = 'PERFECT'
} 

// 反向映射
enum Score {
    BAD,
    NG,
    GOOD,
    PERFECT,
}
let scoreName = Score[0]; // BAD
let scoreName = Sore['BAD']; // 0

// 异构
enum Enum {
    A,  // 0
    B, // 1
    C = 'C', // C
    D = 'D', // D
    E = 6, // 6
    F, // 7
}
// 面试题 - Enum['F'] 输出什么
// 手写实现异构枚举
let Enum;
(function(Enum) {
    // 正向
    Enum['A'] = 0;
    Enum['B'] = 1;
    Enum['C'] = 'C';
    Enum['D'] = 'D';
    Enum['E'] = 6;
    Enum['F'] = 7;
    // 反向
    Enum[0] = 'A';
    Enum[1] = 'B';
    Enum[6] = 'E';
    Enum[7] = 'F';
})(Enum || (Enum = {}));
```

### TS 中类型检查和语法检查哪个在前哪个在后
类型检查在前，语法检查在后，因为类型检查在编译时，语法检查在执行时，准确来说是在预解析的时候。


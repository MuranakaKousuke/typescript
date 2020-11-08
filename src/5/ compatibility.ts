// 型の互換性
let s1: 'test' = 'test';
let s2: string = s1; // No Error
let s3: string = 'test';
let s4: 'test' = s3; // Error

let n1: 0 = 0;
let n2: number = n1; // No Error
let n3: number = 0;
let n4: 0 = n3; // Error


// any型の互換性
// any型は異なる型に変換されるため危険
let aa1: any = false; // let aa1: any;
let aa2: string = aa1; // let aa2: string
let aa3 = aa1 as number; // // let aa3: number;

// unknown型
// unknown型はどんな型の値も受け入れることのできる最も抽象的な型
// any型と異なり、型が決定するまで別の型に代入できない
let un1: unknown = 'test';
let un2: string = un1; // Error
let un3: number = un1 as number; // アサーションで型宣言することでコンパイルエラーにならないが、誤った型宣言になっている


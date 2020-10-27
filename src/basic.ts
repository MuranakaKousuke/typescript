// boolean型
// true, false
let flag: boolean = false;

flag = true;
flag = 2; // Error



// number型
// 16進数, 10進数, 2進数, 8進数をサポート
let hex: number = 0xfff;
let decimal: number = 256;
let binary: number = 0b0000;
let octal: number = 0o123;

decimal = 128;
decimal = 'String'; // Error



// string型
// "", '', ``をサポート
let color: string = 'white';
let myColor: string = `my color is ${color}`;

color = 'black';
color = 256; // Error



// array型 (1)
// 要素の型と[]を用いる
let list1: number[] = [1, 2, 3];
list1 = [4, 7, 'string']; // Error


// array型 (2)
// Array<要素>を用いる
let list2: Array<number> = [1, 2, 3];
list2 = [4, 7, 'string']; // Error



// tuple型
// 固定数の要素の型がわかっている配列を表現する
let x: [string, number];
x = ['hello', 10];
x = [10, 'hello']; // Error

console.log(x[0].substr(1));
console.log(x[1].substr(1)); // 文字列型のsubstr関数を呼び出しているため



// any型
// 型の不明な変数を扱う(JavaScriptからの移行に有効)
let whatever: any = 0;
whatever = 'string';
whatever = false;



// unknown型
// 型安全なany型
const certainlyNumbers: number[] = ['0']; // Error
const maybeNumbers: any[] = ['0'];
const probablyNumbers: unknown[] = ['0'];

certainlyNumbers[0].toFixed(1);
maybeNumbers[0].toFixed(1);
probablyNumbers[0].toFixed(1); // 値の利用に関して厳しくエラーを返す



// void型
// 型が全くないことを表す(値を返さない関数の戻り値として利用する)
function logger(message: string): void {
  console.log(message);
}

// void型の変数はundefinedしか代入出来ない
let unusable: void = undefined;



// null型/undefined型
// null,undefinedは全ての型のサブタイプなので、全ての型にnullとundefinedを代入できる
let u: undefined = undefined;
let n: null = null;



// never型
// 発生し得ない値の型を返す
function error(message: string): never {
  throw new Error(message);
}
function infiniteLoop(): never {
  while(true){}
}



// object型
// 非プリミティブ型(boolean, number, string, symbol, null, undefinedのいずれでもない)
let objectBrace: {}; // ブレース({})を使った型表現ではエラーを得ることができない
let objectType: object;

objectBrace = true;
objectBrace = 0;
objectType = false;
objectType = 1;
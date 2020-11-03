// TypeScriptは宣言時に代入された値から、その値の型を推論する
// const, let, (var)にはそれぞれ特徴があり、型推論の結果が異なる

// letの型推論
let user = 'Taro'; // let user: string
let value = 0; // let value: number
let flag = false; // let flag: boolean


// constの型推論
// constで宣言すると、適用される型推論はLiteral Typesになる
let user = 'Taro'; // const user: "Taro"
let value = 0; // const value: 0
let flag = false; // const flag: false


// Widening Literal Types
// constで宣言した変数を変更可能な変数に代入すると、Literal Typesでなくなる
const wideningZero = 0; // const wideningZero: 0 <-
const nonWideningZero: 0 = 0; // const nonWideningZero: 0
const asWideningZero = 0 as 0; // const asWideningZero: 0

let zeroA = 0; // let zeroA: number
let zeroB = wideningZero; // let zeroB: number <-
let zeroC = nonWideningZero; // let zeroC: 0
let zeroD = asWideningZero; // let zeroD: 0

const zeros = {
  zeroA, // let zeroA: number;
  zeroB, // let zeroB: number; <-
  zeroC, // let zeroC: 0;
  zeroD, // let zeroD: 0;
}
// 制約による型安全
// nullを安全に扱うことのできない処理のため、ランタイムエラーが発生する
function getFormattedValue(value) {
  return `${value.toFixed(1)}pt`;
}

console.log(getFormattedValue(0.1)); // 0.1pt
console.log(getFormattedValue(0)); // 0.0pt
console.log(getFormattedValue(null)); // RuntimeError

// Nullable型を使用することで、型安全なコードを書くことができる
function getFormattedValue2(value: number|null) {
  if (value === null) return '--pt';
  return `${value.toFixed(1)}pt`;
}

console.log(getFormattedValue(0.1)); // 0.1pt
console.log(getFormattedValue(0)); // 0.0pt
console.log(getFormattedValue(null)); // --pt


// 関数の引数をオプションにする
// 引数を必ず与えなければならない関数
function greet(name: string) {
  return `Hello ${name}`;
}

console.log(greet()); // Error
console.log(greet('Taro')); // Hello Taro


// 引数を必ず与える必要がないことを明示するために'?'を付与する
// ?を付与すると、その引数には自動でundefinedが与えられる
function greet2(name?: string) {
  return `Hello ${name}`;
}

console.log(greet2()); // Hello undefined
console.log(greet2('Taro')); // Hello Taro


// コンパイルエラー
function greet3(name?: string) {
  return `Hello ${name.toUpperCase()}`; // undefinedの可能性があるためエラーになる
}

console.log(greet3()); // RuntimeError
console.log(greet3('Taro')); // Hello Taro

// greet3の型推論
// function greet3(name?: string|undefined): string

// ランタイムエラーを起こしうるコードの対処
// このような対処を"ガード節"や"Type Guard"と呼ぶ
function greet4(name?: string) {
  if (name === undefined) return 'Hello';
  return `Hello ${name.toUpperCase()}`;
}

console.log(greet4()); // Hello
console.log(greet4('Taro')); // Hello TARO


// デフォルト引数の型推論
function getFormattedValue3(value: number, unit = 'pt') {
  return `${value.toFixed(1)} ${unit.toUpperCase()}`;
}

// getFormattedValue3の型推論
// function getFormattedValue3(value: number, unit?: string): string

console.log(getFormattedValue3(100)); // 100 PT
console.log(getFormattedValue3(100, 'kg')); // 100.0 KG
console.log(getFormattedValue3(100, 0)); // Error

// 複数の型を受付けたい場合には、初期値を与えた上で型アノテーションを付与する
function getFormattedValue4(value: number, unit: string|null = null) {
  const _value = value.toFixed(1);
  if (unit === null) return `${_value}`;
  return `${_value} ${unit.toUpperCase()}`;
}


// オブジェクトの型安全
// 下記User型のような、全てのプロパティがオプショナルな型を"Weak Type"と呼ぶ
type User = {
  age?: number;
  name?: string;
}

function registerUser(user: User) {}

// 型にないプロパティを持つオブジェクト
const maybeUser = {
  age: 26,
  name: 'Taro',
  gender: 'male',
}

// 型と一致するプロパティを１つも持たないオブジェクト
const notUser = {
  gender: 'male',
  gradyate: 'Tokyo',
}

registerUser(maybeUser); // 部分的にでも一致すればOK
registerUser(notUser); // Error

registerUser(); // 全てのプロパティがオプショナルだが引数は必要なため、Error
registerUser({}); // OK


// Excess Property Checks(過剰なプロパティチェック)
registerUser(maybeUser) // OK

// 設定値に存在しない値に対して過剰に検査する
registerUser({
  age: 26,
  name: 'Taro',
  gender: 'male' // Error
})

// オブジェクトのスプレッドを用いると変数を利用する場合と同じように扱われる
registerUser({...{
  age: 26,
  name: 'Taro',
  gender: 'male'
}})


// 読み込み専用プロパティ
// オブジェクトが保持する値を読み込み専用とする場合、型プロパティ名の前にreadonlyシグネチャを付与する
type State = {
  readonly id: number;
  name: string;
}

const state: State = {
  id: 1,
  name: 'Taro',
}

state.name = 'Hanako';
state.id = 2; // Error

// Readonly型
// 全てのプロパティにreadonlyを付与したい場合、Readonly型を使うと一括して読み込み専用にできる
type State2 = {
  id: number;
  name: string;
}

const state2: Readonly<State2> = {
  id: 1,
  name: 'Taro',
}

state2.name = 'Hanako'; // Error
state2.id = 2; // Error

// Object.freezeの型推論
// Object.freeze関数を利用するとReadonly型が推論適用される
type State3 = {
  id: number;
  name: string;
}

const state3: State3 = {
  id: 1,
  name: 'Taro',
}

const frozenState = Object.freeze(state3);
frozenState.name = 'Hanako'; // Error
frozenState.id = 2; // Error
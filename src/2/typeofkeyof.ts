// typeofキーワード
// typeofキーワードを利用して、宣言済み変数の型を取得できる("型クエリー"と呼ばれるもので、関数や外部モジュールなどの"型キャプチャ"を取得する)
let asString: string = '';
let thisValue: typeof asString;
thisValue = 'value';
thisValue = 0; // Error

// 型推論と組み合わせてtypeofを有効に利用できる
let myObject = {foo: 'foo'};
let anotherObject: typeof myObject = {foo: ''};
anotherObject['foo'] = 'value';
anotherObject['foo'] = 0; // Error



// keyofキーワード
// オブジェクトのプロパティ名称をString Literal Typesで取得できる
type SomeType = {
  foo: string;
  bar: string;
  baz: string;
}

let someKey: keyof SomeType;
// 結果 let someKey: 'foo' | 'bar' | 'baz'



// keyofとtypeofを併用することで、型推論を利用するシーンで有効になる
const keytypeObject = {
  foo: 'FOO',
  bar: 'BAR',
  baz: 'BAZ',
}

let keyObject: keyof typeof keytypeObject;
keyObject = 'bar';
keyObject = 'qux'; // Error


const indexObject = {
  0: 0,
  1: 1,
}

let indexKey: keyof typeof indexObject;
indexKey = 1;
indexKey = 2; // Error
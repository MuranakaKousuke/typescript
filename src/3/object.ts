// Objectの変数宣言時に初期値を与えることで、型推論が適用される
const obj = {
  foo: false,
  bar: 1,
  baz: '2'
}

// objの型推論結果
// const obj: {
//   foo: boolean,
//   bar: number,
//   baz: string,
// }

// Objectのプロパティには再代入が可能なため、保持するプロパティはLiteral typesとして推論されない(constの型推論と挙動が異なる)
obj['foo'] = true;
obj['bar'] = '2'; // Error

// 保持するプロパティをLiteral Typesとして推論するためには、アサーションを利用する
const obj2 = {
  foo: false as false,
  bar: 1 as 1,
  baz: '2' as '2',
}

obj2['foo'] = true // Error
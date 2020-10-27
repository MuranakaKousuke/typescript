// Intersection Types(交差型)
// 複数の型を１つに結合する(既存の型をまとめて、必要な機能を備えた単一の型を取得する)
// アンパサンド(&)で型定義を連結する
type Dog = {
  bark: () => void;
}
type Bird = {
  fly: () => void;
}

type Kimera = Dog & Bird;

// 結果
// type Kimera = {
//   bark: () => void;
//   fly: () => void;
// }



// Union Types(共用体)
// 複数の型のうちの１つの型が成立することを示す
// パイプ(|)で複数型を連結する
let value: boolean | number;
value = false;
value = 1;
value = '2'; // Error

// array型に含む要素をUnion Typesにする場合、()で囲って１つの型として表し、続けて[]でarray型であることを示す
let numberOrStrings: (number | string)[];
numberOrStrings = [0, 'hello'];
numberOrStrings = [0, 'hello', false]; // Error

// Union Typesを利用して、Nullable型を表現できる
let nullableString: string | null;
nullableString = null;
nullableString = 'hello';
nullableString = 2; // Error

let nullableStrings: (string | null)[] = [];
nullableStrings.push('hello');
nullableStrings.push(null);
nullableStrings.push(false); // Error



// Literal Types

// String Literal Types (文字列リテラル)
// 文字列に必要な正確な値を指定できる
let myName: 'Taro';
myName = 'Taro';
myName = 'Jiro'; // Error
myName.toLowerCase(); // String Literal Typesはstring型のサブタイプのため、文字列のもつ関数にアクセスできる

// String Literal TypesをUnion Typesと併用することで定数のように扱うことができる
let users: 'Taro' | 'Jiro' | 'Hanako';
users = 'Taro';
users = 'Hanako';
users = 'Saburo'; // Error



// Numeric Literal Types (数値リテラル)
// 数値として必要な正確な値を指定できる
let Zero: 0;
Zero = 0;
Zero = 1; // Error
Zero.toFixed(1); // Numeric Literal Typesはnumber型のサブタイプのため、数値がもつ関数にアクセスできる

// Numeric Literal TypesをUnion Typesと併用することで定数のように扱うことができる
let numbers: 0 | 1 | 2;
numbers = 0;
numbers = 2;
numbers = 3; // Error



// Boolean Literal Types
// 真偽値に必要な正確な値を指定できる
let truth: true;
truth = true;
truth = false; // Error
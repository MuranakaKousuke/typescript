// 宣言時の記法によって、Array型、Tuple型として扱われる
// Array型の型推論
const a1 = [true, false] // const a1: boolean[]
const a2 = [0, 1, '2'] // const a2: (string|number)[]
const a3 = [false, 1, '2'] // const a3; (string|number|boolean)[]

// 配列に含むことのできる型を固定したい時には、アサーションを付与することで型推論に適用される
const A1 = [0 as 0, 1 as 1] // const a1: (0|1)[]
A1.push(1)
A1.push(2) // Error

// アノテーションによって詳細な型を付与した型を代入しても同様の結果を得ることができる
const zero: 0 = 0;
const one:1 = 1;
const a_1 = [zero, one]; // const a_1: (0|1)[]
a_1.push(1)
a_1.push(2) // Error


// Tuple型の型推論
// Tupleとして型推論を適用するには、Tuple型をアサーションで付与する
const t1 = [false] as [boolean];
const t2 = [false, 1] as [boolean, number];
const t3 = [false, 1, '2'] as [boolean, number, string];

// Tupleに対してindex参照を行うと、代入された値は型を推論する
const v3_0 = t3[0] // boolean
const v3_1 = t3[1] // number
const v3_2 = t3[2] // string
const v3_3 = t3[3] // Error

// index外への値の追加は可能(Tupleに含まれるUnion Typesに限る)
// t1には(boolean)を追加できる
t1.push(true)
t1.push(1) // Error
t1.push('2') // Error

// t2には(boolean|number)を追加できる
t2.push(true)
t2.push(1)
t2.push('2') // Error

// t3には(boolean|number|string)を追加できる
t3.push(true)
t3.push(1)
t3.push('2')



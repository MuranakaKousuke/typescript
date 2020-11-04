// 抽象度による型安全

// TypeScriptの型チェックは"型の互換性"に基づいている
// 抽象的な型は広く値を受け付けることができる
// 詳細な方は担保された制約の下で処理を安全に展開できる
// 抽象的・詳細な型であるべきかはプログラマーが決定することができるため、抽象度をコントロールすることが必要

// ダウンキャスト・アップキャスト
// 推論される型よりもプログラマーの方が型に詳しい場合アサーションで型宣言する(ダウンキャスト)
const defaultTheme = {
  backgroundColor: 'orange' as 'orange',
  borderColor: 'red' as 'red',
}
defaultTheme.backgroundColor = 'blue'; // Error

// 抽象度を上げる型の付与をアップキャストという
function toNumber(value: string): any {
  return value;
}

const fiction: number = toNumber('1,000');
fiction.toFixed() // Runtime Error(number型を期待しているがany型がtoNumberで入り込んでいるため)


// オブジェクトに動的に値を追加する
// [k: string]を"インデックスシグネチャ"と呼び、任意のプロパティを動的に追加することが可能になる
type User1 = {
  name: string;
  [k: string]: any;
}

const userA: User1 = {
  name: 'Taro',
  age: 26
}

const x1 = userA.name // const x1: string
const y1 = userA.age // const y1: any

// インデックスシグネチャが含まれる場合に制約が発生する
type User2 = {
  name: string; // インデックスシグネチャのnumber型とnameのstring型に互換性がないため
  [k: string]: number;
}

// これを回避するためにインデックスシグネチャの型にUnion Typesを使用する
type User3 = {
  name: string;
  [k: string]: string|number;
}

// プロパティ型を制限する
type Answer = 'mighty'|'lot'|'few'|'entirely'
type User4 = {
  name: string;
  enquete: {[k: string]: Answer|undefined}
}

const userB : User4 = {
  name: 'Taro',
  enquete: {
    exercise_habits: 'entirely',
    time_or_sleeping: 'few',
  }
}

const x2 = userB.enquete['exercise_habits'] // const x2: 'mighty'|'lot'|'few'|'entirely'|undefined
const y2 = userB.enquete['step_per_day'] // const y2: 'mighty'|'lot'|'few'|'entirely'|undefined

// プロパティ名を制限する
// "in"キーワードを使用することでプロパティ名を制限できる
type Question = 'exercise_habits'| 'time_or_sleeping'
type Answer1 = 'mighty'|'lot'|'few'|'entirely'
type User5 = {
  name: string;
  enquete: {[k in Question]?: Answer} // ?を使用可能になるため、undefinedは書かなくていい
}

// 何でも許容するインデックスシグネチャ指定
interface AnyIndex {
  [k: string]: any;
}

// 関数のみを許容するインデックスシグネチャ設定
interface Functions {
  [k: string]: Function;
}

// Promiseを返す関数プロパティのみを許容するインデックスシグネチャ設定
interface ReturnPromises {
  [k: string]: () => Promise<any>
}


// const assetion
// as const シグネチャを付与することで簡略化できる
const tuple1 = [false, 1, '2'] as [false, 1, '2']
// const tuple1: [false, 1, '2']
const tuple2 = [false, 1, '2'] as const
// const tuple2: readonly [false, 1, '2']


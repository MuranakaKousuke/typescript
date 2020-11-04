// typeof type guards
// typeof演算子によって型が一致した条件分岐ブロック内部では、値の型は絞り込み推論が適用されている
function reset(value: number|string|boolean) {
  const v0 = value // const v0: string|number|boolean
  if (typeof value === 'number') {
    const v1 = value; // const v1: number
    return 0;
  }
  const v2 = value; // const v2: string|boolean
  if (typeof value === 'string') {
    const v3 = value; // const v3: string
    return '';
  }
  const v4 = value; // const v4: boolean
  return false;
}
console.log(reset(1)) // 0
console.log(reset('1')) // ''
console.log(reset(true)) // false


// in type guards
// 引数に渡されるオブジェクトのうち、どちらかのみに存在するプロパティをin演算子で比較すると型の絞り込み推論が適用される
type User6 = {gender: string}
type UserA = User6 & {name: string}
type UserB = User6 & {age: number; graduate: string}

function judgeUserType(user: UserA|UserB) {
  if ('gender' in user) {
    const u0 = user // const u0: UserA|UserB
    console.log('user type is UserA|UserB')
  }
  if ('name' in user) {
    const u1 = user; // const u1: UserA
    console.log('user type is UserA')
    return;
  }
  const u2 = user; // const u1: UserB
  console.log('user type is UserB')
}


// instanceof type guards
class Creature1 {
  breathe() {}
}

class Animal1 extends Creature1 {
  shakeTail() {}
}

class Human1 extends Creature1 {
  greet() {}
}

function action(creature: Creature1|Animal1|Human1) {
  const c0 = creature // const c0: Creature1|Animal1|Human1
  c0.breathe() // OK
  if (creature instanceof Animal1) {
    const c1 = creature // const c1: Animal1
    return c1.shakeTail()
  }
  const c2 = creature // const c2: Creature1|Human1
  if (creature instanceof Human1) {
    const c3 = creature // const c1: Human1
    return c3.greet()
  }
  const c4 = creature // const c4: Creature1
  return c4.breathe()
}


// タグ付きUnion Types
// 与えられる引数のUnion Typesの全てが共通のプロパティを持ち、
// その型が全てLiteral Typesである場合、条件分岐において型の絞り込みを適用できる
type UserA1 = {gender: 'male'; name: string}
type UserB1 = {gender: 'female'; age: number}
type UserC1 = {gender: 'other'; graduate: string}

function judgeUserType1(user: UserA1|UserB1|UserC1) {
  switch(user.gender) {
    case 'male':
      const u0 = user; // const u0: UserA1
      return 'user type is UserA1';
    case 'female':
      const u1 = user; // const u1: UserB1
      return 'user type is UserB1';
    case 'other':
      const u2 = user; // const u2: UserC1
      return 'user type is UserC1';
    default:
      const u3 = user; // const u3: never
      return 'user type is never'; // defaultに到達することはないため、u3の型はnever型になる
  }
}


// ユーザー定義type guards
// "引数 is type"のように記述することで匿名関数の戻り型アノテーションを利用できる
type User7 = {gender: string; [k: string]: any}
type UserA2 = User7 & {name: string}
type UserB2 = User7 & {age: number}

// この関数を利用することで、与えられる引数がany型でも、その条件を通過したブロックではその型であると推論される
function isUserA2(user: UserA2|UserB2): user is UserA2 {
  return user.name !== undefined;
}
function isUserB2(user: UserA2|UserB2): user is UserB2 {
  return user.age !== undefined;
}

function getUserType(user: any) {
  const u0 = user // const u0: any
  if (isUserA2(user)) {
    const u1 = user // const u1: UserA2
    return 'A';
  }
  if (isUserB2(user)) {
    const u2 = user // const u2: UserB2
    return 'B';
  }
  return 'unknown';
}

const x5 = getUserType({name: 'Taro'}); // const x5: 'A'|'B'|'unknown'


// Array.filterで型を絞り込む
// ユーザー定義ガード節が付与された関数を併用することで、Array.filter絞り込むことができる
type User8 = {name: string}
type UserA8 = User8 & {gender: 'male'|'female'|'other'}
type UserB8 = User8 & {graduate: string}

const users8: (UserA8|UserB8)[] = [
  {name: 'Taro', gender: 'male'},
  {name: 'Hanako', graduate: 'Tokyo'}
]

function filterUser(user: UserA8|UserB8): user is UserB8 {
  return 'graduate' in user
}

const filteredUsers = users8.filter(filterUser); // const filteredUsers: UserB8[]

// 匿名関数を用いても可能
const filteredUsers1 = users8.filter(
  (user: UserA8|UserB8): user is UserB8 => 'graduate' in user
)

// 推論結果
// const filteredUsers1: UserB8[]
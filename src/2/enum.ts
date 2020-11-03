// enumを使用すると数値列挙と文字列列挙の列挙型を利用できる

// 数値列挙
enum Direction {
  Up, // (enum number) Direction.Up = 0
  Down, // (enum number) Direction.Down = 1
  Left, // (enum number) Direction.Left = 2
  Right, // (enum number) Direction.Right = 3
}

// 使い方
const left = Direction.Left;


// 文字列列挙
enum Ports {
  USER_SERVICE = '8080',
  REGISTER_SERVICE = '8081',
}

// 文字列列挙型に限り、異なるブロックで列挙型を追加することができる
// 上記にマージされる
enum Ports {
  MEDIA_SERVICE = '8888',
}
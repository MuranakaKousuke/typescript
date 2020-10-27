// 型推論に頼らずとも、プログラマー自身が値の型の詳細を把握している場合には"アサーション"が有効になる

// アサーション (1) <>を使用する形
let someValue: any = 'this is a string';
let someLength: number = (<string>someValue).length;


// アサーション (2) asを使用する形
let anyValue: any = 'this is a string';
let anyLength: number = (anyValue as string).length;
// TypeScriptは、関数の定義内容に応じて型推論を行う
function getPriceLabel(amount: number, tax: number) {
  return `${amount * tax}`
}

// 推論結果
// function getPriceLabel(amount: number, tax: number): string

// "定義内容の型推論を優先する"のか"定義内容を宣言で制約する"のかは、状況に応じて判断する
// "string型を必ず得る関数を定義する"と、戻り型アノテーションで未然にバグを防ぐことができる
function getStringValue(value: number, prefix?: string): string {
  if (prefix === undefined) return value; // Error
  return `${prefix} ${value}`
}

// 関数内に条件分岐がある場合などの戻り値が曖昧なものには、定義に応じてUnion Typesで型推論が適用され
// Union Typesが適用されるケース
function getScore(score: number) {
  if (score < 0 || score > 100) return null;
  return score;
}

// 推論結果
// function getScore(score: number): (number | null)

// Literal Union Typesが適用されるケース
function getScoreAmount(score: 'A'|'B'|'C') {
  switch(score){
    case 'A':
      return 100;
    case 'B':
      return 60;
    case 'C':
      return 30;
  }
}

// 推論結果
// function getScoreAmount(score: 'A'|'B'|'C'): 100|60|30
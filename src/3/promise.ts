// TypeScriptではPromiseを含むコードの中でも型推論を保持できる
// これではresがstring型であることが特定できない
function wait(duration: number) {
  return new Promise(resolve => {
    setTimeout(() => resolve(`${duration}ms passed`), duration)
  })
}

wait(1000).then(res => {})　// resはunKnown型

// resolve関数の引数を明示的に指定することにより、resの型を特定できる
// (1) 関数戻り型アノテーションで指定する方法
function wait1(duration: number): Promise<string> {
  return new Promise(resolve => {
    setTimeout(() => resolve(`${duration}ms passed`), duration)
  })
}

wait1(1000).then(res => {}) // resはstring型

// (2) Promiseインスタンス作成時に型を付与する方法
function wait2(duration: number) {
  return new Promise<string>(resolve => {
    setTimeout(() => resolve(`${duration}ms passed`), duration)
  })
}

wait2(1000).then(res => {}) // resはstring型


// async関数の中でawaitすることで適切な型推論が行われる
async function queue() {
  const message = await wait1(1000) // const message: string
  return message;
}

// Promise.all / Promise.race
// 非同期処理を並行して実行する
function waitThenString(duration: number) {
  return new Promise<string> (resolve => {
    setTimeout(() => resolve(`${duration}ms passed`), duration);
  })
}

function waitThenNumber(duration: number) {
  return new Promise<number> (resolve => {
    setTimeout(() => resolve(duration), duration);
  })
}

function waitAll() {
  return Promise.all([
    waitThenString(10),
    waitThenNumber(100),
    waitThenString(1000)
  ])
}
// 推論結果
// function waitAll(): Promise<[string, number, string]>

function waitRace() {
  return Promise.race([
    waitThenString(10),
    waitThenNumber(100),
    waitThenString(1000)
  ])
}
// 推論結果
// function waitrace(): Promise<string|number>

async function main() {
  const [a, b, c] = await waitAll(); // a: string, b: number, c: string
  const result = await waitRace(); // result: string|number
}

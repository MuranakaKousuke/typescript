// 外部モジュールで定義された変数や関数は、型付与の有無を問わず型推論の対象になる(require構文では片推論を行わない)
import { value, label, returnFalse } from './importTest';
const v1 = value; // const v1: 10
const v2 = label; // const v2: 'label'
const v3 = returnFalse; // const v3: () => boolean

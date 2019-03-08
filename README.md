# prelude

自作ライブラリで必要となる一般的な機能を集約するためのマイクロライブラリ

## インストール方法

```bash
$ yarn add https://github.com/kuro-kuroite/prelude.git
```

## 最低動作例

- 以下(index.js)を `node --require @babel/register index.js`で実行

```js
import '@babel/polyfill';
import { configEnv, StringBuffer } from '@kuro-kuroite/prelude';

(async () => {
  try {
    configEnv(); // NOTE: 以下に相当する処理を行う．
    // 「.env」に追加すると，`process.env.SOME_ENVIRONMENT_VARIANT`で
    //  環境変数を取得できるようになる
    /*
    import dotenv from 'dotenv';
    const result = dotenv.config();
    if (result.error) {
      throw result.error;
    }
    */
    // eslint-disable-next-line no-console
    console.log(process.env.SOME_ENVIRONMENT_VARIANT);
    
    const message = new StringBuffer();
    
    message.concatString('こんにちは', '\n\n');
    message.concatString('私の名前はBabelです');
    // eslint-disable-next-line no-console
    console.log(message.string);
    /* ->
    こんにちは
    
    私の名前はBabelです
    
     */
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
})();
```

## 公開APIの詳細

基本的には，`src/js/index.js`に公開している．

#### configEnv(void): void

[dotenv](https://www.npmjs.com/package/dotenv)ライブラリで行う処理を関数化したもの．
複数のファイルで使用する定型的な処理を1つの関数にまとめるためである．

使用方法は，以下のサンプル例の通りである．

##### サンプル例

${projectRoot}/.env

```
REGION=JP
LANGUAGE=ja
```

index.js

```js
import '@babel/polyfill';
import { configEnv } from '@kuro-kuroite/prelude';

configEnv();

console.log(process.env.REGION); // => JP
console.log(process.env.LANGUAGE); // => ja
```

`$ node --require @babel/register index.js`

#### configCommandLineArgs(optionDefinitions: OptionDefinition, sections: Section, argv: String[]): object

[command-line-args](https://www.npmjs.com/package/command-line-args)と[command-line-usage](https://www.npmjs.com/package/command-line-usage)で行う処理をライブラリの関数化したもの．
複数のファイルで使用する定型的な処理を1つの関数にまとめるためである．

使用方法は以下のサンプル例の通りである．

- OptionDefinition

see [OptionDefinition](https://github.com/75lb/command-line-args/blob/master/doc/option-definition.md)

- Section

see [Section](https://github.com/75lb/command-line-usage#commandlineusagecontent)

- argv

基本的には，process.argvを渡す．

##### [サンプル例](https://github.com/kuro-kuroite/circle_navi/blob/feature/future/src/js/notifier.js)

```js
import '@babel/polyfill';
import { configCommandLineArgs } from '@kuro-kuroite/prelude';

const optionDefinitions = [
  {
    name: 'message',
    alias: 'M',
    defaultValue: 'こんにちは',
    type: String,
    description: 'Google Home が発話する内容',
  },
  {
    name: 'help',
    alias: 'h',
    type: Boolean,
    description: 'show help',
  },
];

const sections = [
  {
    header: 'circle navi notifier',
    content: 'Google Homeが，コマンドライン引数 message を発話する',
  },
  {
    header: 'Options',
    optionList: optionDefinitions,
  },
];

const options = configCommandLineArgs(
  optionDefinitions,
  sections,
  process.argv,
);
```

```bash
$ node dist/notifier.js --help

circle navi notifier

  Google Homeが，コマンドライン引数 message を発話する

Options

  -M, --message string   Google Home が発話する内容
  -h, --help             show help

```

### new DateFnsTz(region: string): DateFnsTz

[date-fns-tz](https://www.npmjs.com/package/date-fns-tz)のライブラリで公開されているメソッドをまとめて，クラス化したもの．
UTC Dateで扱っている時刻をregionで設定した時刻とを相互変換できるようにするためである．

もう一つは，[date-fns](https://www.npmjs.com/package/date-fns)のv2がまだアルファ版でAPIの仕様がコロコロ変わるので，
*2.0.0-alpha.25* に統一して開発を進めたかったため．実際に，*alpha.25*, *alpha.27*のバージョンの違いで，toDate()やparse()の仕様変更があり，思わぬバグを踏んでいたことがあった．
このバージョン固定は，正式にv2が決定したら廃止する予定である．

以下の4つのメソッドについて，コンストラクタで設定したオプションを用いている．
すなわち，[date-fns-tz](https://www.npmjs.com/package/date-fns-tz)で公開されている関数の最後の引数を自動で設定する仕様とした．

#### .toDate(dateTime: オフセットまたはIANAタイムゾーンを含む文字列 | Date): Date

see [toDate](https://github.com/marnusw/date-fns-tz#todate)

#### .format(utcDateTime: Date, formatString: string, options: Object = { locale: this.tz.language, timeZone: this.tz.language.timeZone, awareOfUnicodeTokens: true }): String

see [format](https://github.com/marnusw/date-fns-tz#format)

#### .zonedTimeToUtc(zonedTime: Date | Number | String): Date

see [zonedTimeToUtc](https://github.com/marnusw/date-fns-tz#zonedtimetoutc)

#### parallel(...promises: () => Promise): Promise

Promiseを返す関数を複数とり，全てのPromiseの終了を待つPromiseを返す．
そのことで，複数のPromiseを並列に実行する処理となる．

see [parallel](https://qiita.com/m0a/items/a83a08b830c518cb85c7)

##### サンプル例

```js
import '@babel/polyfill';
import { parallel } from '@kuro-kuroite/prelude';

function sleepAndSay(time, msg) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(msg);
      resolve();
    }, time);
  });
}

(async () => {
  await parallel(
    async () => {
      await sleepAndSay(50, 'in promise.all 1-1');
      await sleepAndSay(40, 'in promise.all 1-2');
      await sleepAndSay(40, 'in promise.all 1-3');
      return;
    },
    async () => {
      await  sleepAndSay(30, 'in promise.all 2-1');
      await  sleepAndSay(20, 'in promise.all 2-2');
      await  sleepAndSay(20, 'in promise.all 2-3');
      return;
    },
  )
})();
/*
in promise.all 2-1
in promise.all 1-1
in promise.all 2-2
in promise.all 2-3
in promise.all 1-2
in promise.all 1-3
 */
```

#### StringBuffer

文字列の塊をバッファリング(保管)するためだけのクラス．

##### サンプル例

```js
import '@babel/polyfill';
import { StringBuffer } from '@kuro-kuroite/prelude';

const message = new StringBuffer();

message.concatString('こんにちは', ' ');
message.concatString('私はBabelです', '\n');
message.concatString('よろしくお願いします');
console.log(message.string);
/* ->
こんにちは 私はBabelです
よろしくお願いします

 */
```

### 補足

ほかのライブラリをexportする，または，promise化だけしている関数・クラス．

#### dateFns object

see date-fns

#### fsAsync object

see fs and promise

#### commandLineArgs function

see command-line-args

#### commandLineUsage function

see command-line-usage

## 本ライブラリの開発者向け

### 開発

このライブラリは，src/js/index.js(理由: `yarn deploy`)がメインプログラムの記述箇所である．
ライブラリとして公開されている関数，クラスはこのファイルの`export`のみである．
もちろん，ダーティーハックで非公開部分の変更は可能である．

基本的なディレクトリ構成は，[Atomic Design](https://design.dena.com/design/atomic-design-%E3%82%92%E5%88%86%E3%81%8B%E3%81%A3%E3%81%9F%E3%81%A4%E3%82%82%E3%82%8A%E3%81%AB%E3%81%AA%E3%82%8B/) を採用した．
すなわち，原子(atom) -> 分子(molecule) -> 有機体(organism) の多重階層となっている．
これは，Promise化といった単純な関数をatomsに，公開する関数やクラスを organisms に，このorganismsが使用する子関数，子クラスをmolecules に分類するためだ．

この階層の中身は，`ライブラリ・種類名/機能名 or index.js` とした．
特別な意味はないが，ファイルよりはディレクトリとして小分類したかったためである．
内部実装が気になる場合は，この部分のjsファイルを参照するとよい．

もし，本ライブラリを変更した場合は，`yarn deploy`をすると，`dist/` ディレクトリに [Babel](https://babeljs.io/) される．
簡単な実行であれば，`yarn babel-node path/to/file.js` するとよい．
念のために，`sandbox/`は自由に使える場所としており，`yarn deploy:sandbox && node tmp/file.js` でテストも可能だ．

### 整形

もし，jsファイルを整形したい場合は，`yarn .lint` または，`yarn .prettier:all` を試してほしい．
この部分は特にこだわって，作成した．
`scripts/` 以下が，npm-scripts 用のコマンドの実装となっている．

もし，この部分の.babel.jsファイルを変更した場合，`yarn .babel:all`をすると，.js も変更される．

## 最後に

本ライブラリは，出来るだけ美しい開発が出来るように，ディレクトリの階層と整形処理に時間をかけた．
プロジェクトルートにある他のドットファイルについて説明しきれなかったが，もし気になる場合は調べたうえで是非とも試してみてほしい．

補足であるが，JavaScript(Node.js) を使用する場合は，絶対にBabelとPromise(async, await or callback)の理解が必須である．
Babelで最新の書き方を覚え，Node.jsの非同期処理に慣れた後に，自分なりに新しいライブラリを作成してほしい．
ただ，最近はTypeScript が主流みたいなので，挑戦したい方はそちらがいいかもしれない．JS の上位互換でBabelは勝手にやってくれるみたいだし．

その際に，本ライブラリのディレクトリの階層と設定ファイルを参考にしてくれると幸いである．

あぁ，あと強者はWebpackをやるのがよい時間つぶしになるだろう．かといって，Parcelが良いというわけでもない．
私は「Webpack疲れ」をしたのでお勧めはしないが...．あれは，大量の素晴らしいエラーを吐いてくれたので最高？のツールだから．

### License

- [MIT](https://github.com/kuro-kuroite/LICENSE/blob/master/LICENSE.md)

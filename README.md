## npm_template

ecmascript_template と開発環境に違いがあるために，npm library 用の開発環境をバックアップ

npm_template を利用して 別のプロジェクトで使用するための個人的な npm library 開発をできる．
基本的には，`yarn deploy` のみを提供する．

### Quick Overview

deploy npm library in dist direcotry.
exporting library main file is *dist/index.js* which is written in package.json

#### hello world sample

* you can create favorite npm library using this. and publish it to git remote repository

```bash
# rename your favorite npm library name
git clone https://github.com/kuro-kuroite/npm_template.git
cd ..
mv npm_template <npm name>
cd $_

yarn

# NOTE: escape backquote for bash
cat <<EOF >> src/js/index.js
const helloName = (name = 'template') => \`hello, ${name}!\`;

const logHelloName = (name = 'template') => {
  // eslint-disable-next-line no-console
  console.log(helloName(name));
};

// eslint-disable-next-line import/prefer-default-export
export { helloName, logHelloName };
EOF

# convert src/**/*.js into dist/**/*.js
yarn deploy
git add dist/ && git commit -m "feat: add logging hello template!"
# create new git remote url, and then
git remote add origin <new git remote url>
git push origin master
```

* use the \<npm name\> npm library for another project

first, you create project directory, and then `yarn add <new git remote url>`.
you can use the created library for your project

```bash
cd <path/to/project/>

yarn add <new git remote url>

cat <<EOF >> src/index.js
const logHelloName = require('<npm name>').logHelloName;

logHelloName('world');
EOF
node src/index.js // => hello, world!
```

### usage

* `yarn deploy`

deploy src/**/*.js file to dist/**/*.js

```bash
yarn deploy
git add src/js/**/*.js && git commit -m "feat: create your commit"
git push
``` 

#### advanced usage


* `yarn .babel:all`

compile ES6 file like *.babel.js to ES5 like *.js in same directory

* `yarn .prettier:all`

format js files in project

* `yarn .lint:all`

lint js files in project

### development environmenmt

* Git Bash on Windows 10

```
Windows 10 version 1803
Git Bash git version 2.18.0.windows.1
Yarn 1.9.4
Node.js v8.11.3
```

* Ubuntu on Vagrant on VirtualBox on Windows 10

```
Ubuntu 16.04.4 LTS (ubuntu-xenial 4.4.0-139-generic)
Vagrant 2.0.4
VirtualBox 5.2.8 r121009 (Qt5.6.2)
Windows 10 version 1803
git version 2.19.2
nodenv 1.1.2-69-gced0e70
Node.js v8.11.4
Yarn 1.12.3
```

特に，Windows と Vagrant 関係で，一発で yarn install が通ることはないので，
以下に参考としたリンクを載せておく

- [Windowsホスト上のVagrantのシンボリックリンクフォルダでyarn installできない問題の解決](https://qiita.com/maikya_gu/items/8e313dcd50c39f5a4b0b)
- [260文字のファイルパスの制限を解除（して node_modules 削除 : Windows 10](https://beachside.hatenablog.com/entry/2017/07/25/183000)

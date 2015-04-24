# javascript-refactoring BETA

## What does javascript-refactoring does?

For now, only instrument functions, changing your original code. Then after see the result you can get your original code back with git ou UNDO.

-----------------

## Features

- replaces "return statements" of functions for tracing purposes

-----------------

## Usage

#### 0. Install this package

```sh
$ apm install javascript-refactoring
```

#### 1. Install debug-print in your project

```sh
$ npm i debug-print
```

#### 2. Activate plugin

Press: `ctrl + l`, `ctrl + r`

#### 3. run your app with DEBUG=*

```sh
# inline ENV
$ DEBUG=* node your_app_name.js

# or call gulp/grunt/...
$ DEBUG=* (gulp| grunt| anything)

# or export ENV
$ export DEBUG=*
$ node your_app_name.js
```

for developers
------------------------

## clone all

```sh

echo '-----------------------------------------------------'
echo 'creating ast folder...'

mkdir ast
cd ast

echo '-----------------------------------------------------'
echo 'Cloning all repos...'

git clone git@github.com:saitodisse/atom-javascript-refactor.git

# clone and link all dependencies
./scripts/clone-and-link
```

## uses

- https://github.com/saitodisse/debug-print
- https://github.com/saitodisse/log-my-code
- https://github.com/azukiapp/castborg

## how to install from code

```sh
git clone git@github.com:saitodisse/atom-javascript-refactor.git
cd atom-jsRefactoring-tutorial
apm link
```

- insert a `console.log(arguments)` on top pf current function

  - on atom just press: ctrl + F11


![A screenshot of your package](https://f.cloud.github.com/assets/69169/2290250/c35d867a-a017-11e3-86be-cd7c5bf3ff9b.gif)

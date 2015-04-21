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

Press: `Ctrl + F11`

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
git clone git@github.com:saitodisse/debug-print.git
git clone git@github.com:saitodisse/log-my-code.git
git clone git@github.com:azukiapp/castborg.git
```

## prepare all your dev environment

```sh
echo '-----------------------------------------------------'
echo 'debug-print compiling...'

cd debug-print
npm i && gulp babel
cd ..

echo '-----------------------------------------------------'
echo 'castborg compiling...'

cd castborg
npm i && gulp babel
cd ..

echo '-----------------------------------------------------'
echo 'log-my-code compiling...'

cd log-my-code
npm i && gulp babel

echo 'linking debug-print...'
rm -rf node_modules/debug-print
ln -sf `pwd`/../debug-print node_modules

echo 'linking castborg...'
rm -rf node_modules/castborg
ln -sf `pwd`/../castborg node_modules

cd ..

echo '-----------------------------------------------------'
echo 'atom-javascript-refactor compiling...'

cd atom-javascript-refactor
npm i
echo 'activating plugin (apm link)...'
apm link

echo 'linking castborg...'
rm -rf node_modules/castborg
ln -sf `pwd`/../castborg node_modules

echo 'linking log-my-code...'
rm -rf node_modules/log-my-code
ln -sf `pwd`/../log-my-code node_modules

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

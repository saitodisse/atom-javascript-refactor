Javascript-Refactoring Tools
------------


### Commands

------------

### `ctrl + l, l` Insert console.log with selected text

Insert console.log that was inserted with the last command

------------

### `ctrl + l, c` Removes all console.log

Removes all console.log that was inserted with the last command

------------

### `ctrl + l, r` Instrument all function (requires debug-print)

Very useful to trace what functions are called in a node.js app. For now, only instrument functions, changing your original code. Then after see the result you can get your original code back with git or UNDO.

** 1. Install debug-print to your node project **

```sh
$ npm i debug-print
```

** 2. run your app with DEBUG=* env **

```sh
# inline ENV
$ DEBUG=* node your_app_name.js

# or call gulp/grunt/...
$ DEBUG=* (gulp| grunt| anything)

# or export ENV
$ export DEBUG=*
$ node your_app_name.js
```


------------------------


# developers
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

## how to install from code

```sh
git clone git@github.com:saitodisse/atom-javascript-refactor.git
cd atom-jsRefactoring-tutorial
apm link
```

## dependencies

- https://github.com/saitodisse/debug-print
- https://github.com/saitodisse/log-my-code
- https://github.com/azukiapp/castborg

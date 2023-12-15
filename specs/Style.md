# Style Specification

Our automated linting on the client side utilizes [ESLint](https://eslint.org/) with the [Stylistic](https://eslint.style/) plugin to automate and enforce our style guidelines.

We utilize the recommended defaults for these two tools to create a wide spread of consistency between our code without needing to customize every single setting. Our approach was to use the defaults, watch for anything unusual, and edit our configuration as necessary. Due to the length of these default lists, we will instead link to the full lists and add any changes or customizations we added below.

## Default Lists
- [ESLint](https://eslint.org/docs/latest/rules/) (Rules with a ✅ are enabled)
- [Stylistic](https://eslint.style/rules)

## Customizations

### @stylistic/indent

Indentatiosn use four spaces.

```js
function abc() {
    console.log("Hello World!");
}
```

### @stylistic/quotes

Strings are made with double quotes.

```js
const txt = "CSE 210 is awesome!";
```

### @stylistic/semi

Semicolins must be included.

```js
console.log("#PowellGang");
```

### @stylistic/arrow-spacing

Arrow functions must have a space before and after the `=>`.

```js
(a, b) => {
	...
}
```

### @stylistic/block-spacing

Single line blocks must have a space between the curly braces and code. Multiline blocks must have the code start on a new line from the curly brace.

```js
function foo() { return true; }

function bar() {
	const x = "a";
	return x;
}
```

### linebreak-style

Linebreaks use CRLF.

### no-var

Disallows the use of `var`.

```js
let x = 1;
const y = 2;
```

### prefer-const

Requires const declarations for variables that are never reassigned after being declared.

```js
const x = 1;
let y = 2;
y = 3;
```
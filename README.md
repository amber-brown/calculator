# Calculator Tech Test

Calculator which performs integer arithmetic operations taking account of BIDMAS, limited to + - / \* operators.

### Assumptions

- As this is an integer arithmetic calculator, any fractions have been removed by truncation (Math.trunc) when performing division. Division is the only operation that needs extra thought to make integer arithmetic work given the constraint given above that the only allowable inputs are integers, see: [Integer Division](https://mathworld.wolfram.com/IntegerDivision.html).
- Division by 0 will return Infinity.
- Any operation on Infinity, returns Infinity.
- I assumed that given this was a technical test you would want to see the implementation of a calculator from the ground up rather than using a library. In a real world setting I would probably look at using a library like [Math.js](https://mathjs.org) as it would be more widely supported and maintained.

### Limitations

- The only allowable inputs are positive integers. However, I believe the input of negative integers would be easy to implement by adding some extra functionality to the tokenizer.
- Keyboard input is not supported but would be able to be implemented by listening on the document for the relevant keyCodes and passing their associated symbols to the onButtonPress function in the UI layer.

## Project setup

npm install

### Compiles and hot-reloads for development

npm run serve

### Compiles and minifies for production

npm run build

### Run your unit tests

npm test

### Lints and fixes files

npm run lint

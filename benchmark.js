const Benchmark = require('benchmark')

const suite = new Benchmark.Suite
const arr = new Array(800)

// Prep code
for (var i = 0; i < arr.length; ++i) {
  arr[i] = (Math.random() * 10001) | 0
}

suite.add('While loop imitating a for loop', () => {
  let i = 0

  while (i < arr.length) {
    arr[i]
    i++
  }
}).add('While loop imitating for loop and caching length', () => {
  let i = 0
  const len = arr.length

  while (i < len) {
    arr[i]
    i++
  }
}).add('Reverse while loop', () => {
  let i = arr.length

  while (i--) {
    arr[i]
  }
}).add('Reverse while loop without implicit toBoolean', () => {
  let i = arr.length

  while (i-- > 0) {
    arr[i]
  }
}).add('Reverse do while loop', () => {
  let i = arr.length

  do {
    arr[i]
  } while (i--)
}).add('Reverse for loop', () => {
  for (let i = arr.length; i--;) {
    arr[i]
  }
}).add('Normal for loop', () => {
  for (let i = 0; i < arr.length; ++i) {
    arr[i]
  }
}).add('Normal for loop caching length', () => {
  const len = arr.length

  for (let i = 0; i < len; ++i) {
    arr[i]
  }
}).add('Pre-increment for loop', () => {
  for (let i = -1; ++i < arr.length;) {
    arr[i]
  }
}).add('Pre-increment for loop. caching length', () => {
  const len = arr.length

  for (let i = -1; ++i < len;) {
    arr[i]
  }
}).add('Native array forEach', () => {
  arr.forEach(x => {
    x
  })
}).add('Native array forEach with named function', () => {
  const foo = function foo(x) {
    x
  }

  arr.forEach(foo)
})
.on('cycle', event => console.log(String(event.target))).run({ async: true })

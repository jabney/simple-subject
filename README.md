# SimpleSubject
## Subscribe, notify, unsubscribe

A simple, no-frills subject-observer implementation written in TypeScript.

- [Repository](https://github.com/jabney/simple-subject)
- [Implementation](https://github.com/jabney/simple-subject/tree/master/src)
- [Examples](https://github.com/jabney/simple-subject/tree/master/examples)

### Installation
```bash
> npm install simple-subject-observer
```

### From source
```bash
> git clone git@github.com:jabney/simple-subject.git

> cd simple-subject

> npm install

> npm run build
```

### Usage
```javascript
// Import the class
const SimpleSubject = require('simple-subject-observer')

// Create an instance
const subject = new SimpleSubject()

// Subscribe and define a notification callback
const observer1 = subject.subscribe((payload, id) => {
  console.log(`subscriber ${id}: ${payload}`)
})

// Subscribe and define a notification callback
const observer2 = subject.subscribe((payload, id) => {
  console.log(`subscriber ${id}: ${payload}`)
})

// Subscribe and define a notification callback
const observer3 = subject.subscribe((payload, id) => {
  console.log(`subscriber ${id}: ${payload}`)
})

// Notify all observers
subject.notify({ message: 'notified' })

// Unsubscribe observers
for (const observer of [observer1, observer2, observer3]) {
  ovserver.unsubscribe()
}
```

Output:
```
subscriber 0: {message: "notified"}
subscriber 1: {message: "notified"}
subscriber 2: {message: "notified"}
```

### Using TypeScript

If your `tsconfig.json` is set up to use commonjs modules, e.g., `"module": "commonjs"`, you can use `require`:

```javascript
import SimpleSubject = require('simple-subject-observer')
```

However this doesn't work when using ES2015 modules, e.g., `"module": "es2015"`. In this case, use the TypeScript source:

```javascript
import { SimpleSubject } from 'simple-subject-observer/src'
```

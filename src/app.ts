function Logger(constructor: Function) {
  console.log('Loggin...')
  console.log(constructor)
}

// Decorator is printed before created Person object
// Decorators execute when class is DEFINED
@Logger
class Person {
  name = 'Levan'

  constructor() {
    console.log('Creating Object...')
  }
}

const p = new Person()
console.log(p)
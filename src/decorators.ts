function Logger(logString: string) {
  return function(constructor: Function) {
    console.log(logString)
    console.log(constructor)
  }
}

function WithTemplate(template: string, hookId: string) {
  return function<T extends {new(...args: any[]): { name: string }}>(originalConstructor: T) {
    return class extends originalConstructor {
      constructor(..._: any[]) {
        super()
        console.log('Rendering template')
        const hookEl = document.getElementById(hookId)
        const p = new originalConstructor()
        
        if(hookEl) {
          hookEl.innerHTML = template
          hookEl.querySelector('h1')!.textContent = p.name
        }
      }
    }
  }
}

// Decorator is printed before created Person object
// Decorators execute when class is DEFINED

// They're executing BOTTOM-UP (first-template, then logger)
@Logger('HEYY BOEEEY')
@WithTemplate('<h1>Hello levan</h1>', 'app')
class Person {
  name = 'Levan'

  constructor() {
    console.log('Creating Object...')
  }
}

const p = new Person()
console.log(p)



// ----------------------------------------

function Log(target: any, propertyName: string | symbol) {
  console.log('Property Decorator')
  console.log(target, propertyName)
}
class Product {

  @Log
  title: string
  private _price: number

  constructor(t: string, p: number){
    this.title = t;
    this._price = p
  }

  set price(val: number) {
    if(val > 0) {
      this._price = val
    } else {
      throw new Error('Invalid price - value shouldn\'t be negative')
    }
  }
  getPriceWithTax(tax: number) {
    return this._price * (1 + tax);
  }
}




// ---------------------
interface ValidatorConfig {
  [property: string]: {
    [validatableProperty: string]: string[] // ['required', 'positive']
  }
}

const registeredValidators: ValidatorConfig = {}

function Required(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: ['required']
  }
}

function PositiveNumber(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: ['positive']
  }
}

function validate(obj: any) {
  const objValidatorConfig = registeredValidators[obj.constructor.name]
  if(!objValidatorConfig) {
    return true
  }

  let isValid = true
  for(const prop in objValidatorConfig) {
    for(const validator of objValidatorConfig[prop]) {
      switch(validator) {
        case 'required':
          isValid = isValid && !!obj[prop];
          break;
        case 'positive':
          isValid = isValid && obj[prop] > 0;
          break;
      }
    }
  }
  return isValid
}
class Course {
  @Required
  title: string;

  @PositiveNumber
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}


const courseForm = document.querySelector('form')!
courseForm.addEventListener('submit', event => {
  event.preventDefault()
  const titleEl = document.getElementById('title') as HTMLInputElement
  const priceEl = document.getElementById('price') as HTMLInputElement

  const title = titleEl.value
  const price = +priceEl.value

  const createdCourse = new Course(title, price)

  if(!validate(createdCourse)) {
    alert('Invalid input, please try again!')
    return
  }
  console.log(createdCourse)
})
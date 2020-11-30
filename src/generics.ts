// //! ARRAY (knows what data it stores)
// const names: Array<string> = [];
// names[0].split(' ');

// //! PROMISE (knows what data it returns)
// const promise = new Promise<string>((resolve, reject) => {
//   setTimeout(() => {
//     resolve('This is done!')
//   }, 2000);

//   reject('Something went wrong...')
// })

// promise.then(data => data.split(' '))


//! BUILD OUR OWN GENERIC (function)
// with T an U genric type we tell tsc that
// this two object (objA, objB) can be different types
// objA და objB ს შეიძლება ქონდეთ სხვადასხვანაირი აღნაგობა
function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB)
} 

const mergedObj = merge({name: 'Levani'}, { age: 20 })
// console.log(mergedObj.name)


interface Lengthy {
  length: number;
}

function countAndPrint<T extends Lengthy>(el: T): [T, string] {
  let descriptionText = 'Got no value.';
  if(el.length === 0) {
    descriptionText = 'Got 1 element'
  } else if(el.length > 1) {
    descriptionText = 'Got ' + el.length + ' elements'
  }
  return [el, descriptionText]
}

console.log(countAndPrint('Hello Levan!'));

// key should be one of key of first object
function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
  return obj[key];
}

console.log(extractAndConvert({ name: 'max'}, 'name'))

//! BUILD OUR OWN GENERIC (class)
class DataStorage<T extends string | boolean | number> {
  private data: T[] = []

  addItem(item: T) {
    this.data.push(item)
  }

  removeItem(item: T) {
    if(this.data.indexOf(item) === -1) return
    this.data.splice(this.data.indexOf(item), 1)
  }

  getItems() {
    return [...this.data]
  }
}

const textStorage = new DataStorage<string>()
textStorage.addItem('Levani')
textStorage.addItem('Gio')
textStorage.removeItem('Levani')
console.log(textStorage.getItems())

const numberStorage = new DataStorage<number>()


const objStorage = new DataStorage<number>()



// GENERIC UTILITY TYPES

//! PARTIAL
interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

function createCourseGoal(title: string, description: string, date: Date): CourseGoal {
  let courseGoal: Partial<CourseGoal> = {}

  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = date;
  return courseGoal as CourseGoal
}


//! Readonly
const names: Readonly<string[]> = ['Levani', 'Giorgi']




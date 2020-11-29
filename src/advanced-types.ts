// Intersection Types

type Admin = {
  name: string;
  privileges: string[]
}

type Employee = {
  name: string;
  startDate: Date
}

type ElevatedEmployee = Admin & Employee

// interface ElevatedEmployee extends Admin, Employee {}

const e1: ElevatedEmployee = {
  name: 'LEVANI',
  privileges: ['HOPE', 'DREAM'],
  startDate: new Date()
}


// Discriminated Unions
type Combineable = string | number
type Jonjoli = boolean | number

type Universal = Combineable & Jonjoli


type UnknownEmployee = Employee | Admin;


// FUNCTION OVERLOADS

// if we call this function and both arguments are number return type is number
function add(a: string, b: string): string
function add(a: Combineable, b: Combineable) {
  if(typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }

  return a + b
}

// ზოგადად ეს add ფუნქცია აბრუნებს სტრინგს, ნამბერს ან ბულეანს მაგრამ
// ამ კონკრეტულ შემთხვევაში ვეუბლებით რომ დაბრუნებული მნიშვნელობა
// უეჭველი იქნეაბა სტრინგი
// const result = add('Levani', 'JUBA') as string


let result = add('Levani', 'JUBA').split('i')
console.log('RESULT', result)



function printEmployeeInformation(emp: UnknownEmployee) {
  console.log('Name:', emp.name)
  if('privileges' in emp) {
    console.log('Privileges:', emp.privileges)
  }
}


printEmployeeInformation(e1)


class Car {
  drive() {
    console.log('Driving...')
  }
}
class Truck {
  drive() {
    console.log('Driving Truck...')
  }

  loadCargo(amount: number) {
    console.log('Loading cargo...' + amount)
  }
}


type Vehicle = Car | Truck

const v1 = new Car()
const v2 = new Truck()

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();

  // ONE WAY
  // if('loadCargo' in vehicle) {
  //   vehicle.loadCargo(1000)
  // }

  // SECOND WAY
  if(vehicle instanceof Truck) {
    vehicle.loadCargo(1000)
  }
}

useVehicle(v2)


// TYPE CASTING
// #1 
// ! - This exclemation mark tells typesctipt that value in front of this never be a NULL
// const userInput = <HTMLInputElement>document.getElementById('user-input')!
// #2
const userInput = document.getElementById('user-input') as HTMLInputElement;

userInput.value = 'Hello buddy!'


// INDEX PROPERTIES
interface ErrorContainer { // { email: 'Not a valid email', username: 'Must start with a  character' }
 // we dont know how many and which properties we have
 [prop: string]: string;
}


const errorBag: ErrorContainer = {
  email: 'Not a valid email',
  username: 'Must start with a  character'
}

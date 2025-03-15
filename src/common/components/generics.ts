// // Дженериковая функция
// function declaration
function identity1<T>(arg: T): T {
  return arg
}

// arrow function(expression)
const identity2 = <T>(arg: T): T => {
  return arg
}

export default identity1

// // 1. Задача
// // Реализация универсального фильтра в массиве
// // Напиши дженериковую функцию filterArray, которая принимает массив элементов любого типа и функцию-предикат(predicate) ✳️, а возвращает новый массив, состоящий только из элементов, которые удовлетворяют условию предиката.
// //
// // ✳️ Функция-предикат - это функция, которая в результате своего выполнения возвращает булево значение
// //
// // Требования
// // Функция должна быть дженериковой и работать с массивами любого типа.
// //   Функция-предикат принимает элемент массива и возвращает boolean.
// //   Если ни один элемент массива не удовлетворяет условию, функция должна возвращать пустой массив.
//
// // const filterArray1 = (arr: number[], predicate: (value: number) => boolean) => {
// //   return arr.filter(predicate)
// // }
// // const filterArray2 = (arr: string[], predicate: (value: string) => boolean) => {
// //   return arr.filter(predicate)
// // }
//
// //
// const filterArray = <T>(arr: T[], predicate: (value: T) => boolean) => {
//   return arr.filter(predicate)
// }
//
// // Пример 1: Фильтрация чисел
// const numbers = [1, 2, 3, 4, 5, 6, 7]
// const isEven = (num: number) => num % 2 === 0
//
// const result = filterArray<number>(numbers, isEven)
// console.log(result) // [2, 4]
//
// // Пример 2: Фильтрация строк
// const words = ["hello", "world", "typescript"]
// const startsWithT = (word: string) => word.startsWith("t")
//
// const result2 = filterArray<string>(words, startsWithT)
// console.log(result2) // ["typescript"]

// // 2. Задача (2 дженерика)
// // Напиши дженериковую функцию mapArray, которая принимает массив элементов любого типа и функцию-преобразователь (transform),
// // применяет ее к каждому элементу массива и возвращает новый массив с результатами преобразований.
// //
// // Пример 1: Преобразование чисел в строки
//
// // const mapArray1 = (arr: number[], transform: (value: number) => string) => {
// //   return arr.map(transform)
// // }
// //
// const mapArray2 = (arr: string[], transform: (value: string) => number) => {
//   return arr.map(transform)
// }
// //
// // const mapArray3 = (arr: Person[], transform: (value: Person) => string) => {
// //   return arr.map(transform)
// // }
//
// const mapArray = <T, D>(arr: T[], transform: (value: T) => D) => {
//   return arr.map(transform)
// }
//
// const numbers = [1, 2, 3, 4]
// const transformNumberToString = (num: number) => `Number: ${num}`
//
// const result = mapArray(numbers, transformNumberToString)
// console.log(result) // ["Number: 1", "Number: 2", "Number: 3", "Number: 4"]
//
// Пример 2: Преобразование строк в их длины
// const words = ["hello", "world", "typescript"]
// const getLength = (word: string) => word.length
//
// const lengthResults = mapArray(words, getLength)
// console.log(lengthResults) // [5, 5, 10]

// // Пример 3: Преобразование объектов в строки
// type Person = { name: string; age: number }
// const people: Person[] = [
//   { name: "Alice", age: 25 },
//   { name: "Bob", age: 30 },
// ]
// const toDescription = (person: Person) => `${person.name} is ${person.age} years old`
//
// const descriptions = mapArray(people, toDescription)
// console.log(descriptions) // ["Alice is 25 years old", "Bob is 30 years old"]

// // Д.З
// //
// // Реализация универсальной функции для работы с массивами
// // Необходимо создать дженериковую функцию, которая принимает массив любого типа и значение того же типа,
// //   и возвращает новый массив с добавленным значением, если его там нет.
// //   Если значение уже есть в массиве, функция должна вернуть массив без изменений.
// //
// //   Требования
// // Функция должна быть дженериковой и работать с массивами любого типа.
// //   Для проверки наличия элемента в массиве использовать метод includes.
// //   Тип массива и тип элемента должны быть связаны через дженерики.
// //   Функция должна быть чистой (не изменять оригинальный массив).
//
//
// // Строки
//
// const stringArray = ["apple", "banana", "cherry"]
//
// const updateArray = <T>(arr: T[], value: T) => {
//   return arr.includes(value) ? [...arr] : [...arr, value]
// }
//
// const result1 = updateArray(stringArray, "banana") // ['apple', 'banana', 'cherry']
// const result2 = updateArray(stringArray, "date") // ['apple', 'banana', 'cherry', 'date']
//
// console.log(result1)
// console.log(result2)
//
// // // Числа
// //
// const numberArray = [1, 2, 3]
// const result3 = updateArray(numberArray, 2) // [1, 2, 3]
// const result4 = updateArray(numberArray, 4) // [1, 2, 3, 4]
//
// console.log(result3)
// console.log(result4)

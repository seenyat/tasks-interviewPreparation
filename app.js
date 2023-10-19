/* 1
 * Написать функцию, которая принимает строку и возвращает ее в обратном порядке
 */

export function reverseString(str) {
  return str.split("").reverse().join("");
}

/* 2
 * Написать функцию, которая будет возвращать промис спустя определённое время
 */

export function delay(timeout) {
  return new Promise((res, rej) => {
    setTimeout(() => res(), timeout);
  });
}

/* 3
 * Есть два сортированных массива с промисами, которые через секунду возвращают числа.
 * Нужно написать функцию, которая возвращает новый массив,
 * содержащий элементы, которые встречаются в обоих массивах.
 */

const firstArr = [
  Promise.resolve(1),
  Promise.resolve(2),
  Promise.resolve(3),
  Promise.resolve(4),
  Promise.resolve(8),
];
const secondArr = [
  Promise.resolve(3),
  Promise.resolve(4),
  Promise.resolve(2),
  Promise.resolve(6),
  Promise.resolve(7),
];

export async function getIntersection(first, second) {
  const firstArr = await Promise.all(first);
  const secondArr = await Promise.all(second);
  return firstArr.filter((el) => secondArr.includes(el));
}

/* 4
 * Написать функцию, которая принимает массив чисел и возвращает промис,
 * который через секунду вернёт сумму этих чисел
 */

export function sum(arr) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(arr.reduce((acc, el) => acc + el, 0));
    }, 1000);
  });
}

/* 5
 * С бекенда приходит массив такого вида:  */

// const arr = [
//     { name: 'width', value: 10 },
//     { name: 'height', value: 20 },
//     { name: 'date', value: 30 },
//     ...
// ];

/* Нужно получить объект такого вида:  */

// const obj = {
//   width: 10,
//   height: 20,
//   ...
// }

export function objFromArr(arr) {
  const obj = arr.reduce((acc, el) => {
    acc[el.name] = el.value;
    return acc;
  }, {});
  return obj;
}

/* 6
 * Нужно написать функцию, которая принимает число N и возвращает функцию,
 * вызов которой первые N раз возвращает 'yes', а потом – 'no'.
 */

export function yesOrNo(n) {
  let count = 0;
  return () => {
    if (count < n) {
      count++;
      return "yes";
    } else {
      return "no";
    }
  };
}

/* 7
 * Подсчитать количество вхождений каждого символа в строке и вернуть результат в приведенном ниже формате.
 * Порядок символов в результате должен соответствовать исходной строке.
 * Например: orderedCount("abracadabra") // => [['a', 5], ['b', 2], ['r', 2], ['c', 1], ['d', 1]]
 */

const str = "abacabad";

export function orderedCount(str) {
  const res = [];
  const arr = str.split("");
  const set = new Set(arr);

  for (let el of set) {
    res.push([el, arr.filter((item) => item === el).length]);
  }

  return res;
}

/* 8
 * Написать функцию strJoin, которая склеивает строки через заданный разделитель
 * strJoin('>', 'a', 'b', 'c') // 'a>b>c'
 */

export function strJoin(separator, ...str) {
  return str.join(separator);
}

/* 9
 * Дана строка, состоящая из букв A-Z:
 * "AAAABBBCCXYZDDDDEEEFFFAAAAAABBBBBBBBBBBBBBBBBBBBBBBBBBBB"
 * Нужно написать функцию rle, которая на выходе даст строку вида:
 * "A4B3C2XYZD4E3F3A6B28"
 * и сгенерирует любую ошибку, если на вход пришла невалидная строка.
 *
 * Пример:
 * rle("AAAABBBCCXYZDDDDEEEFFFAAAAAABBBBBBBBBBBBBBBBBBBBBBBBBBBB")) --> "A4B3C2XYZD4E3F3A6B28"
 *
 * Пояснения:
 * 1. Если символ встречается 1 раз, он остается без изменений
 * 2. Если символ повторяется более 1 раза, к нему добавляется количество повторений
 */

export function rle(str) {
  const re = /^[A-Z]+$/;
  if (!re.test(str)) {
    return new Error("невалидная строка");
  }

  let lastLetter = str[0];
  let count = 1;
  const resRle = [];

  for (let i = 1; i < str.length; i++) {
    if (str[i] === lastLetter) {
      count++;
    } else {
      if (count === 1) {
        resRle.push(lastLetter);
      } else {
        resRle.push(lastLetter, count);
        count = 1;
      }
      lastLetter = str[i];
    }
  }

  if (count === 1) {
    resRle.push(lastLetter);
  } else {
    resRle.push(lastLetter, count);
  }

  return resRle.join("");
}

/* 10
  Вам дан массив, который может содержать любые типы данных. Например:
  [1, 'any [complex] string', null, function() {}, [1, 2, [3, '4'], 0], [], { a: 1 }]

  Ваша задача - создать функцию flatten,
  которая принимает этот массив в качестве аргумента и возвращает новый массив,
  в котором все вложенные массивы "выпрямлены".

  Например, вызов:
  flatten([1, 'any [complex] string', null, function() {}, [1, 2, [3, '4'], 0], [], { a: 1 }]

  Должен вернуть:
  [1, 'any [complex] string', null, function() {}, 1, 2, 3, '4', 0, { a: 1 }]

  Обратите внимание: функция "flatten" не должна изменять исходный массив и должна возвращать новый массив.
 */

export function flatten(arr) {
  // Простое решение:
  // return arr.flat(Infinity)
  return arr.reduce((acc, el) => {
    if (Array.isArray(el)) {
      acc = acc.concat(flatten(el));
    } else {
      acc.push(el);
    }
    return acc;
  }, []);
}
console.log(flatten([1, [2, [3, [4]]]]));

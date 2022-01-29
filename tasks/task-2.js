// Задание №2
// Реализовать функцию invert на чистом JS, которая будет менять ключи и значения объектов местами:
const invert = (obj) => {
    const invertedEntries = Object.entries(obj).map(current => current.reverse());

    return Object.fromEntries(invertedEntries);
};

// Test
console.log(invert({'a': 'some', 'b': 'object', 'c': 1})); // { 'some': 'a', 'object': 'b', '1': 'c' }

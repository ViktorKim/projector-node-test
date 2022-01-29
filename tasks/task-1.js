// Задание №1
// Реализовать функцию groupBy на чистом JS, которая будет группировать массив по определённой функции,
// переданной вторым аргументом:
const groupBy = (array, func) => {
    return array.reduce((result, current) => {
        const key = func(current);

        if (result[key]) {
            result[key].push(current);

            return result;
        }

        return {
            ...result,
            [key]: [current]
        };

    }, {});
};

console.log(groupBy([3.6, 3.7, 6.4, 8.9], Math.floor)); // { '3': [3.6, 3.7], '6': [6.4], '8': [8.9] }

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

// Задание №2
// Реализовать функцию invert на чистом JS, которая будет менять ключи и значения объектов местами:
const invert = (obj) => {
    const invertedEntries = Object.entries(obj).map(current => current.reverse());

    return Object.fromEntries(invertedEntries);
};

// Test
console.log(invert({'a': 'some', 'b': 'object', 'c': 1})); // { 'some': 'a', 'object': 'b', '1': 'c' }

// Задание №3
// Реализовать функцию checkParentheses на чистом JS, которая проверяет на синтаксическую верность последовательность
// скобок ( (), {} и [] ). Функция возвразает false, если переданная строка содержит неправильную последовательность:
const checkParentheses = (str) => {
    const bracketsRegExp = new RegExp('\\[.*\\]');
    const curlyBracketsRegExp = new RegExp('\\{.*\\}');
    const roundBracketsRegExp = new RegExp('\\(.*\\)');

    return bracketsRegExp.test(str) || curlyBracketsRegExp.test(str) || roundBracketsRegExp.test(str);
};

// Test
console.log(checkParentheses('--()--')); // true
console.log(checkParentheses('-a]--[')); // false
console.log(checkParentheses('dsa{vsfs{ad')); // false
console.log(checkParentheses('j78(g5b]uyg')); // false
console.log(checkParentheses(',m{i987y}hj')); // true
console.log(checkParentheses('dsa[3ed---:]::')); // true

// Задание №4
// Дан объект, эмулирующий в самом примитивном виде слой работы с данными:
const database = {
    getUser: (id, callback) => {
        const users = [{
            id: 1,
            name: 'Robert',
        }, {
            id: 2,
            name: 'John'
        }];

        const user = users.find((user) => user.id === id);
        if (!user) {
            callback(`User with id=${id} not found`);
        } else {
            callback(null, user);
        }
    },
    getUsersBook: (userId, callback) => {
        const usersBooks = {
            1: [],
            2: [1, 2],
        };

        const userBook = usersBooks[userId];
        if (!userBook) {
            callback(`Set of books related to userId=${userId} not found`);
        } else {
            callback(null, userBook);
        }
    },
    buyBook: (id, callback) => {
        const books = [{
            id: 1,
            name: 'Art of war'
        }, {
            id: 2,
            name: 'Hunger games'
        }, {
            id: 3,
            name: '1984'
        }];

        const book = books.find((book) => book.id === id);
        if (!book) {
            callback(`Book with id=${id} not found`);
        } else {
            callback(null, true);
        }
    },
};

// Необходимо с помощью Promises (async/await) отрефакторить функцию ниже, чтобы избежать большого количества уровней
// вложенности, а также чтобы повысить читаемость:
const buyBookForUser = (bookId, userId, callback) => {
    function getUser() {
        return new Promise((res, reg) => database.getUser(userId, (err, user) => {
            if (err) {
                return reg(callback(err));
            }

            return res(user);
        }));
    }

    function getUserBooks() {
        return new Promise((res, rej) => database.getUsersBook(userId, (err, userBooks) => {
            if (err) {
                return rej(callback(err));
            }

            return res(userBooks);
        }));
    }

    function isAlreadyHasBook(userBooks, bookId) {
        return userBooks.includes(bookId);
    }

    getUser().then(() => getUserBooks(userId)).then(books => {
        if (isAlreadyHasBook(books, bookId)) {
            return callback(`User already has book with id=${bookId}`);
        }

        database.buyBook(bookId, (err) => {
            if (err) {
                callback(err);
            } else {
                callback(null, 'Success');
            }
        });
    });
};

// Test
buyBookForUser(1, 1, (err, message) => {
    console.log(err); // null
    console.log(message); // 'Success'
});

buyBookForUser(1, 2, (err, message) => {
    console.log(err); // 'User already has book with id=1'
    console.log(message); // undefined
});

buyBookForUser(3, 2, (err, message) => {
    console.log(err); // null
    console.log(message); // 'Success'
});

buyBookForUser(5, 2, (err, message) => {
    console.log(err); // 'Book with id=5 not found'
    console.log(message); // undefined
});

buyBookForUser(1, 3, (err, message) => {
    console.log(err); // 'User with id=3 not found'
    console.log(message); // undefined
});

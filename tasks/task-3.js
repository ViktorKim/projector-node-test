// Задание №3
// Реализовать функцию checkParentheses на чистом JS, которая проверяет на синтаксическую верность последовательность
// скобок ( (), {} и [] ). Функция возвразает false, если переданная строка содержит неправильную последовательность:
export const checkParentheses = (str) => {
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

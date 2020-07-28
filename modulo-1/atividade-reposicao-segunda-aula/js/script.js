/**
 * Pergunta 1
 * Considerando a função abaixo, qual o valor retornado por f2()?
 */
const array = [1, "2", "3", 4, 5];
function f2() {
    return array.filter((item) => typeof item === "string");
}
console.log(f2());

/**
 * Pergunta 2
 * Considerando a função abaixo, qual o valor retornado por f3()?
 */
const array3 = [1, 2, 3, 4, 5, 6];
function f3() {
    return array3
        .map((item) => item * 2)
        .filter((item) => item % 3 === 0)
        .reduce((accumlator, current) => accumlator + current, 0);
}
console.log(f3());

/**
 * Pergunta 3
 * Considerando a função abaixo, qual o valor retornado por f5()?
 */
const array5 = [1, 2, 3, 4, 5, 6, 7, 8];
function f5() {
    return [...array5, 9, 10];
}
console.log(f5());

/**
 * Pergunta 4
 * Considerando o trecho de código, qual seria uma alternativa de boa prática
 * para melhorar a legibilidade do código de atribuição de dados a variáveis?
 */
const object = {
    id: 1,
    name: "Neil Peart",
    instrument: "Drums",
    age: 67,
    band: "Rush"
};

const id = object.id;
const name = object.name;
const instrument = object.instrument;
const age = object.age;
const band = object.band;

/**
 * Pergunta 5
 * Considerando a função abaixo, qual o valor retornado por example(10)?
 */
function example(n1, n2 = 20) {
    return n1 + n2 / 4;
}
console.log(example(10));

/**
 * Pergunta 6
 * Considerando a função abaixo, qual o valor retornado por f1()?
 */
const array1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
function f1() {
    return array1.map((item) => item ** 2);
}
console.log(f1());

/**
 * Pergunta 7
 * Considerando a função abaixo, qual o valor exibido no console durante a
 * execução de p4()?
 */
function p4() {
    let interval = null;
    let i = 0;
    let array = [];

    interval = setInterval(() => {
        array.push(i++);

        if (i === 5) {
            clearInterval(interval);
            console.log(array);
        }
    }, 1000);
}
p4();

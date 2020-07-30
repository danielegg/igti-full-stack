console.log(process.argv); // recebe dados da linha de comando "node index2.js 100"
const numero = parseInt(process.argv[2]);
const multiplos = [];
for (let i = 3; i < numero; i++) {
    if (i % 3 === 0 || i % 5 === 0) {
        multiplos.push(i);
    }
}
console.log(multiplos);

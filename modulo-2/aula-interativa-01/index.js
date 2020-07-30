import { promises as fs } from "fs";
import { time } from "console";

const times = [];

init();

async function init() {
    const data = JSON.parse(await fs.readFile("2003.json"));
    // console.log(data);

    data[0].partidas.forEach((partida) => {
        times.push({ time: partida.mandante, pontuacao: 0 });
        times.push({ time: partida.visitante, pontuacao: 0 });
    });
    // console.log(times);

    data.partidas.forEach((partida) => {});
}

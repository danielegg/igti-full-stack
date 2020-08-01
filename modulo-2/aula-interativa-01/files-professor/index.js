import { promises as fs, writeFile } from "fs";

init();

const times = [];

async function init() {
    try {
        const data = JSON.parse(await fs.readFile("2003.json"));

        //inicializando array de times
        data[0].partidas.forEach(partida => {
            times.push({time: partida.mandante, pontuacao: 0});
            times.push({time: partida.visitante, pontuacao: 0});
        });
    
        //preenchendo a pontuacao dos times no array de times
        data.forEach(rodada => {
            rodada.partidas.forEach(partida => {
                const timeMandante = times.find(item => item.time === partida.mandante);
                const timeVisitante = times.find(item => item.time === partida.visitante);
    
                if (partida.placar_visitante > partida.placar_mandante) {
                    timeVisitante.pontuacao += 3;                
                } else if (partida.placar_mandante > partida.placar_visitante) {
                    timeMandante.pontuacao += 3;
                } else {
                    timeMandante.pontuacao += 1;
                    timeVisitante.pontuacao += 1;
                }
            });
        });
    
        //ordenar pela pontuacao
        times.sort((a, b) => {
            return b.pontuacao - a.pontuacao
            /*if (a.pontuacao < b.pontuacao) {
                return 1;
            }
            if (a.pontuacao > b.pontuacao) {
                return -1;
            }
            return 0;*/
        });
    
        /*for (const item of times) {
            fs.writeFile(`${item.time}.json`, item.pontuacao);
        }*/

        console.log("A" > "B");

        let timeMaiorNome = "";
        let timeMenorNome = times[0].time;
        times.forEach(item => {
            if (item.time.length > timeMaiorNome.length) {
                timeMaiorNome = item.time;
            }

            if (item.time.length < timeMenorNome.length) {
                timeMenorNome = item.time;
            }
        });

        console.log(timeMaiorNome);
        console.log(timeMenorNome);

        salvaTimes();

        salvaQuatroPrimeiros();
    } catch (err) {
        console.log(err);
    }    
}

async function salvaTimes() {
    await fs.writeFile("times.json", JSON.stringify(times, null, 2));    
}

async function salvaQuatroPrimeiros() {
    await fs.writeFile("quatroPrimeiros.json", JSON.stringify(times.slice(0, 4), null, 2));
}
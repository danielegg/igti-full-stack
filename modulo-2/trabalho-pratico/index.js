import { promises as fs } from 'fs';

let ufs = [],
    cidades = [];

init();
// qntCidades('MG');

async function init() {
    //   Lê os arquivos json
    ufs = JSON.parse(await fs.readFile('json/Estados.json', 'utf-8'));
    cidades = JSON.parse(await fs.readFile('json/Cidades.json', 'utf-8'));

    cidadesPorUFs();
    await maisCidades();
    await menosCidades();
}

async function cidadesPorUFs() {
    try {
        for await (const uf of ufs) {
            let cidadesPorUF = cidades.filter((cidade) => {
                return cidade.Estado === uf.ID;
            });
            //   console.log(cidadesPorUF);
            await fs.writeFile(`json\\${uf.Sigla}.json`, JSON.stringify(cidadesPorUF));
        }
    } catch (error) {
        console.log(error);
    }
}

async function qntCidades(uf) {
    try {
        const qnt = JSON.parse(await fs.readFile(`json/${uf}.json`, 'utf-8'));
        // console.log(`O Estado do ${uf} possui: ${qnt.length} municípios.`);
        return qnt.length;
    } catch (error) {
        console.log(error);
    }
}

async function maisCidades() {
    let numCidades = [];
    try {
        for (const uf of ufs) {
            numCidades.push({
                uf: uf.Sigla,
                qntCidades: await qntCidades(uf.Sigla)
            });
        }

        numCidades.sort((a, b) => {
            return b.qntCidades - a.qntCidades;
        });
    } catch (error) {
        console.log(error);
    }
    console.log(numCidades.slice(0, 5));
}

async function menosCidades() {
    let numCidades = [];
    try {
        for (const uf of ufs) {
            numCidades.push({
                uf: uf.Sigla,
                qntCidades: await qntCidades(uf.Sigla)
            });
        }

        //  Ordena cidades com menos habitantes
        numCidades.sort((a, b) => {
            return a.qntCidades - b.qntCidades;
        });
        console.log(numCidades.slice(0, 5));

        // Reordena os 5 UFs com menos habitantes em ordem populacional.
        let mc = numCidades.slice(0, 5);
        mc.sort((a, b) => {
            return b.qntCidades - a.qntCidades;
        });
        console.log(mc.slice(0, 5));
    } catch (error) {
        console.log(error);
    }
}

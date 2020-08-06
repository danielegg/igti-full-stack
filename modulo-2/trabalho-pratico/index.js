import { promises as fs } from 'fs';

let ufs = [],
    cidades = [];

init();

async function init() {
    //   Lê os arquivos json
    ufs = JSON.parse(await fs.readFile('json/Estados.json', 'utf-8'));
    cidades = JSON.parse(await fs.readFile('json/Cidades.json', 'utf-8'));

    await cidadesPorUFs();
    await maisCidades();
    await menosCidades();
    await maiorCidadeNome();
    await menorCidadeNome();
}

async function cidadesPorUFs() {
    try {
        for await (const uf of ufs) {
            let cidadesPorUF = cidades.filter((cidade) => {
                return cidade.Estado === uf.ID;
            });
            //   console.log(cidadesPorUF);
            await fs.writeFile(
                `json\\${uf.Sigla}.json`,
                JSON.stringify(cidadesPorUF)
            );
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
                qntCidades: await qntCidades(uf.Sigla),
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
                qntCidades: await qntCidades(uf.Sigla),
            });
        }

        //  Ordena cidades com menos habitantes
        numCidades.sort((a, b) => {
            return a.qntCidades - b.qntCidades;
        });
        // console.log(numCidades.slice(0, 5));

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

let cidadeMaiorNome,
    cidadeMaiorNomeUF = [];
async function maiorCidadeNome() {
    try {
        for (const uf of ufs) {
            const ufJson = JSON.parse(
                await fs.readFile(`json/${uf.Sigla}.json`, 'utf-8')
                // await fs.readFile(`json/AC.json`, 'utf-8')
            );

            const cidadeMaiorNome = await ufJson.sort((a, b) => {
                // return b.Nome.length - a.Nome.length;
                if (a.Nome.length > b.Nome.length) {
                    return -1;
                } else if (a.Nome.length < b.Nome.length) {
                    return 1;
                } else {
                    if (a.Nome > b.Nome) {
                        return 1;
                    }
                    return -1;
                }
            });
            cidadeMaiorNomeUF.push({
                Cidade: cidadeMaiorNome[0].Nome,
                UF: getUFByCidade(cidadeMaiorNome[0].Estado),
                CidadeQntCaracteres: await contaPalavras(
                    cidadeMaiorNome[0].Nome
                ),
            });
        }

        cidadeMaiorNomeUF.sort((a, b) => {
            return b.CidadeQntCaracteres - a.CidadeQntCaracteres;
        });
        console.log(cidadeMaiorNomeUF);
    } catch (error) {
        console.log(error);
    }
}

let cidadeMenorNome,
    cidadeMenorNomeUF = [];
async function menorCidadeNome() {
    try {
        for (const uf of ufs) {
            const ufJson = JSON.parse(
                await fs.readFile(`json/${uf.Sigla}.json`, 'utf-8')
                // await fs.readFile(`json/AC.json`, 'utf-8')
            );

            const cidadeMenorNome = await ufJson.sort((a, b) => {
                // return a.Nome.length - b.Nome.length;
                if (a.Nome.length > b.Nome.length) {
                    return 1;
                } else if (a.Nome.length < b.Nome.length) {
                    return -1;
                } else {
                    if (a.Nome > b.Nome) {
                        return 1;
                    }
                    return -1;
                }
            });
            // console.log(cidadeMenorNome);

            cidadeMenorNomeUF.push({
                Cidade: cidadeMenorNome[0].Nome,
                UF: getUFByCidade(cidadeMenorNome[0].Estado),
                CidadeQntCaracteres: await contaPalavras(
                    cidadeMenorNome[0].Nome
                ),
            });
        }
        // console.log(cidadeMenorNomeUF);

        cidadeMenorNomeUF.sort((a, b) => {
            return a.CidadeQntCaracteres - b.CidadeQntCaracteres;
        });
        console.log(cidadeMenorNomeUF);
    } catch (error) {
        console.log(error);
    }
}

function contaPalavras(str) {
    return str.length;
}

function getUFByCidade(ufID) {
    // console.log('ID = ' + parseInt(ufID));
    const result = ufs.find((el) => el.ID === ufID);
    return result.Sigla;
}

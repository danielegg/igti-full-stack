import { promises as fs } from 'fs';

async function init() {
  //fez a leitura do conteudo atual
  const data = JSON.parse(await fs.readFile('teste.json'));
}

let inputBusca = null,
    btnBusca = null,
    formSearch = null,
    resultadoBusca = null,
    qntSexoMasculino = null,
    qntSexoFeminino = null,
    qntSomaIdade = null,
    qntMediaIdades = null,
    allUsuarios = [];

window.addEventListener("load", () => {
    inputBusca = document.querySelector("#inputBusca");
    btnBusca = document.querySelector("#btnBusca");
    formSearch = document.querySelector("#formSearch");

    qntBusca = document.querySelector("#resultadoBusca .qnt");
    resultadoBusca = document.querySelector("#resultadoBusca .conteudo");

    // estatistica
    qntSexoMasculino = document.querySelector(
        "#estatisticas #qntSexoMasculino"
    );
    qntSexoFeminino = document.querySelector("#estatisticas #qntSexoFeminino");
    qntSomaIdade = document.querySelector("#estatisticas #qntSomaIdade");
    qntMediaIdades = document.querySelector("#estatisticas #qntMediaIdades");

    inputBusca.addEventListener("keyup", disabledBtn);
    formSearch.addEventListener("submit", searchUsuario);

    fetchUsuarios();
    // render();
});

function disabledBtn() {
    const qntLetras = inputBusca.value.length;
    if (qntLetras > 0) {
        btnBusca.removeAttribute("disabled");
    } else {
        btnBusca.setAttribute("disabled", "disabled");
        document.querySelector("#dadosDeUsuarios").style.display = "none";
    }
}

async function fetchUsuarios() {
    const res = await fetch(
        "https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo"
    );
    const json = await res.json();

    allUsuarios = json.results.map((usuario) => {
        const { name, picture, dob, gender } = usuario;

        return {
            nome: name.first + " " + name.last,
            foto: picture.thumbnail,
            idade: dob.age,
            genero: gender
        };
    });

    // console.log(allUsuarios);
    // render();
}

function searchUsuario(e) {
    e.preventDefault();
    // console.log(allUsuarios);
    document.querySelector("#dadosDeUsuarios").style.display = "flex";
    const busca = inputBusca.value;

    const resultSearchUsuarios = allUsuarios
        .filter((el) => {
            return el.nome.toLowerCase().indexOf(busca.toLowerCase()) > -1;
        })
        .sort((a, b) => {
            return a.nome.localeCompare(b.nome);
        });

    // console.log(resultSearchUsuarios);
    render(resultSearchUsuarios);
}

function render(resultSearchUsuarios) {
    renderUsuariosList(resultSearchUsuarios);
    estatisticas(resultSearchUsuarios);
}

function renderUsuariosList(resultSearchUsuarios) {
    let usuariosHTML = "<div>";
    let qnt = 0;
    resultSearchUsuarios.forEach((usuario) => {
        const { nome, foto, idade } = usuario;
        qnt++;

        const usuarioHTML = `
        <div class="row usuario">
            <div class="col-3">
                <img src="${foto}" alt="${nome}" class="rounded-circle img-fluid z-depth-2 img-thumbnail">
            </div>
            <div class="col-9">
                <span class="posicao-nome">${nome}, ${idade} anos.</span>
            </div>
        </div>
        `;

        usuariosHTML += usuarioHTML;
    });

    usuariosHTML += "</div>";
    resultadoBusca.innerHTML = usuariosHTML;
    qntBusca.textContent = qnt;
}

function estatisticas(resultSearchUsuarios) {
    let qntH = 0;
    let qntM = 0;
    let somaIdades = 0;
    let mediaIdades = 0;
    let qnt = 0;

    resultSearchUsuarios.forEach((usuario) => {
        const { idade, genero } = usuario;
        if (genero === "male") {
            qntH++;
        } else if (genero === "female") {
            qntM++;
        }
        // soma das idades
        somaIdades += idade;
        // contador de usuários selecionados
        qnt++;
    });
    // media das idades
    mediaIdades = parseFloat(somaIdades / qnt);

    qntSexoMasculino.textContent = qntH;
    qntSexoFeminino.textContent = qntM;
    qntSomaIdade.textContent = somaIdades;
    if (mediaIdades > 0) {
        qntMediaIdades.textContent = mediaIdades.toLocaleString("pt-BR", {
            maximumFractionDigits: 2
        });
    } else {
        qntMediaIdades.textContent = 0;
    }
}

window.addEventListener("load", start);

let r = 0,
    g = 0,
    b = 0;

function start() {
    const range_r = document.querySelector("#range-r");
    const range_g = document.querySelector("#range-g");
    const range_b = document.querySelector("#range-b");

    range_r.addEventListener("input", changeValueField);
    range_g.addEventListener("input", changeValueField);
    range_b.addEventListener("input", changeValueField);
}

function changeValueField(e) {
    function changeColor(field) {
        switch (field) {
            case "range-r":
                r = document.getElementById(field).value;
                break;
            case "range-g":
                g = document.getElementById(field).value;
                break;
            case "range-b":
                b = document.getElementById(field).value;
                break;
            default:
                break;
        }
        const square = document.querySelector(".square");
        square.style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
    }

    let field = e.target.id;
    changeColor(field);
    field = "#" + field.replace("range", "field");
    let f = document.querySelector(field);
    f.value = e.target.value;
}
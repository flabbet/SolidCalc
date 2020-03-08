const volumeButton = document.querySelector("#volumeBtn");
const areaButton = document.querySelector("#areaBtn");
const inputA = document.querySelector("#InputA");
const inputB = document.querySelector("#InputB");
const inputH = document.querySelector("#InputH");
const result = document.querySelector("#result");

volumeButton.addEventListener("click", ()=> {writeOutput("volume")})
areaButton.addEventListener("click", ()=> {writeOutput("area")})

inputA.addEventListener("change", () => {updateMeshScale(inputA.value, null, null)});
inputB.addEventListener("change", () => {updateMeshScale(null, null, inputB.value)});
inputH.addEventListener("change", () => {updateMeshScale(null, inputH.value, null)});


function writeOutput(calculationType){
    let res;
    if(calculationType === "volume"){
    res = "Objętość wynosi " + calculateVolume() + "m<sup>3<sup>";
    }
    else if(calculationType === "area"){
        res = "Pole wynosi " + calculateArea() + "m<sup>2<sup>"
    }
    result.innerHTML = res;
}

function calculateArea(){
    return 2 * Number(inputA.value) * Number(inputB.value) + 2 * Number(inputB.value) * Number(inputH.value) + 2 * Number(inputA.value) * Number(inputH.value);
}

function calculateVolume() {
    return Number(inputA.value) * Number(inputB.value) * Number(inputH.value);
}
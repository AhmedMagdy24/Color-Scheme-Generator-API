const getScheme = document.querySelector("#getScheme")
const chooseColor = document.querySelector("#chooseColor")
const chooseMode = document.querySelector("#chooseMode")
const displayScheme = document.querySelector("#displayScheme")

function callAPI(){
    fetch(`https://www.thecolorapi.com/scheme?hex=${chooseColor.value.substr(1)}&format=json&mode=${chooseMode.value}&count=6`)
        .then(res=>res.json())
        .then(data=>{
            renderColors(data.colors)
        })
}
// Make default call on first load
callAPI()

getScheme.addEventListener("click", callAPI)

function renderColors(colors){
    displayScheme.innerHTML = ""
    colors.map(color=>{
        let swatch = document.createElement("div")
        let chip = document.createElement("div")
        let label = document.createElement("div")
        chip.classList = "chip"
        chip.setAttribute("style",`background-color:${color.hex.value}`)
        label.classList = "label"
        label.innerText = color.hex.value
        swatch.dataset.color = color.hex.value
        swatch.classList = "swatch"
        swatch.appendChild(chip)
        swatch.appendChild(label)
        swatch.addEventListener("click", (e)=>{
            e.preventDefault()
            e.stopPropagation()
            navigator.clipboard.writeText(swatch.dataset.color)
        })
        displayScheme.appendChild(swatch)
    })
}
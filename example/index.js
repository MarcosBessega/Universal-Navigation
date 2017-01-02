import uNav from "../index"
const Nav = new uNav()

document.getElementById("react").onclick = Nav.link({name: "react", scripts: ["dist/react.js"]})
document.getElementById("vue").onclick = Nav.link({name: "vue", scripts: ["dist/vue.js"]})

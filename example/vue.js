import Vue from "vue"
import Hello from "./hello.vue"

const mount = () => {
  console.log("VUE MOUNTING");
  const element = document.createElement('div')
  element.id = "vueRoot"
  document.body.appendChild(element)
  new Vue({
    el: '#vueRoot',
    render: h => h(Hello)
  })
}

const unmount = () => {
  console.log("VUE UNMOUNTING")
  document.body.removeChild(document.getElementById("vueWrapper"))
}


window.uNavPages.vue = {
  mount: mount,
  unmount: unmount
}
console.log("VUE LOADED");

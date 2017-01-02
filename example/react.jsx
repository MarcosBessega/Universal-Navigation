import React from "react"
import {render} from "react-dom"

const mount = () => {
  console.log("REACT MOUNTING");
  const element = document.createElement('div')
  element.id = "rootReact"
  document.body.appendChild(element)
  render(
    <h1>Hello from React!</h1>,
    document.getElementById('rootReact')
  );
}

const unmount = () => {
  console.log("REACT UNMOUNTING");
  document.body.removeChild(document.getElementById('rootReact'))
}

window.uNavPages.react = {
  mount: mount,
  unmount: unmount
}
console.log("REACT LOADED");

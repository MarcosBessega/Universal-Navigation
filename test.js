const test = require("tape")
const uNav = require("./index")

test("new uNav Should Be a Object with 2 properties", t => {
  t.plan(2)
  const nav = new uNav()
  t.equal(typeof nav, "object")
  t.equal(Object.keys(nav).length, 3)
})

test("new uNav Should Have link, mount and loadScript functions from prototype", t => {
  t.plan(3)
  const nav = new uNav()
  t.equal(typeof nav.link, "function")
  t.equal(typeof nav.mount, "function")
  t.equal(typeof nav.loadScript, "function")
})

test("nav.link should return a function", t => {
  t.plan(1)
  const nav = new uNav()
  const link = nav.link({name: "teste", mount: () => null, unmount: () => null})
  t.equal(typeof link, "function")
})

test("nav.loadScript should load a script", t => {
  t.plan(1)
  const nav = new uNav()
  const url = "https://ajax.googleapis.com/ajax/libs/hammerjs/2.0.8/hammer.min.js"
  nav.loadScript(url)
  .then(() => {
    t.equal(typeof window.Hammer, "function")
    t.end()
  })
})

test("Everything Should Work", t => {
  t.plan(5)
  const nav = new uNav()
  const link = nav.link({name: "react", scripts: ["http://localhost:5238/dist/react.js"]})
  const link2 = nav.link({name: "vue", scripts: ["http://localhost:5238/dist/vue.js"]})
  link().then(() => {
    t.deepEqual(Object.keys(window.uNavPages.react), ['mount', 'unmount'])
    t.equal(document.getElementById("rootReact").innerHTML, '<h1 data-reactroot="">Hello from React!</h1>')
    link2().then(() => {
      t.equal(document.getElementById("rootReact"), null)
      t.deepEqual(Object.keys(window.uNavPages.vue), ['mount', 'unmount'])
      t.equal(document.getElementById("vueWrapper").innerHTML, 'Hello From Vue!')
      t.end()
    })
  })
})

# Universal-Navigation
  A Huge ugly Workaround to achieve navigation between "pages" in the same app writen in different frameworks(don't do that by the way)
  It's really fucking ugly, i know. If you have better ideas to solve that specific problem, i`d be happy to hear =)

## What Exactly it does
  Assume you have an app with two modules, one for User CRUD and another for fetching tweets. You asked for a friend of yours to make the users CRUD, and he did it in vue.js. You don't like Vue.js, so you built the tweets stuff with React. For some reason you really want the app to be a single page, or it's a Electron app and you don`t want the users to feel like he is in a web browser.

  Here enters this piece of crap. Basically you will expose to the window(object) two functions per module, one to mount it and another to unmount, like that:

  ````js
  window.uNavPages.CRUD = {
    mount: () => // creates dom node, new Vue, etc,
    unmount: () => // probally remove dom node
  }
  ````

  Then, supose you have a menu to switch between them, you would do something like:

  ````js
  import uNav from "Universal-Navigation"
  const Nav = new uNav()
  document.getElementById("menu-btn-1").onclick = Nav.link({name: "CRUD", scripts: ["dist/crud.js"]})
  document.getElementById("menu-btn-2").onclick = Nav.link({name: "TWEETS", scripts: ["dist/tweets.js"]})
  ````

  where name must be the exact name of the object you put in window.uNavPages

  scripts must be an array and may contain multiple scripts, as long as one of them expose the mounting functions

  You can also pass a styles array to load some css files

  Nav.link will return a function, that when called will call unmount of the current mounted module(if there is one) and call mount of the one you passed the name.

  You can check the example folder where i poorly tried to demonstrate how it works.

## Running Tests

  Start the test server(needed to serve the scripts we will be trying to load) with **npm run serve:test** and Run the Tests with **npm test**

const express = require("express")

const app = express()
app.use(express.static('example'))
app.listen(5238, () => {
  console.log("Ok...");
})

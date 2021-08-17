require("dotenv").config()

const express = require("express")
const bodyParser = require("body-parser")
const jwt = require("jsonwebtoken")
const passport = require("passport")
const JWT_SECRET = process.env.JWT_SECRET
const User = require("./models/User")
const authenticate = require("./middleware/authentication")

const app = express()
app.use(bodyParser.json())
app.use(passport.initialize())

app.get("/users", async (request, response) => {
  const users = await User.query()
  response.json({ users })
})

app.get("/secrets", authenticate, (request, response) => {
  response.json({
    message: `Congratulations ${request.user.username}, you're logged in!`
  })
})

app.post("/signup", async (request, response) => {
  const user = await User.signup(request.body.user)
  response.json({ user })
})

app.post("/login", async (request, response) => {
  try {
    const user = await User.authenticate(request.body.user)
    const data = { username: user.username }
    const token = jwt.sign(data, JWT_SECRET, {
      expiresIn: "1h",
      issuer: "api.myapp.com",
    })

    response.json({ token })
  } catch (error){
    console.error(error.message)
    response.status(401).json({
      error: "Bad username or password",
    })
  }
})

app.use((error, request, response, next) => {
  console.error(error.message)
  response.status(500).json({
    error: "There was an error processing this request."
  })
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}`))

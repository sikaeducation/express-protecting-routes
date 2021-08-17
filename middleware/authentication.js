const passport = require("passport")
const { Strategy, ExtractJwt } = require("passport-jwt")
const User = require("../models/User")
const JWT_SECRET = process.env.JWT_SECRET

async function verify(payload, done){
  const user = await User.query().where("username", payload.username).first()
  if (!user){
    done(null, false)
  }
  done(null, user)
}

const jwtStrategy = new Strategy({
  secretOrKey: JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  algorithms: ["HS256"],
  issuer: "api.myapp.com",
}, verify)

passport.use(jwtStrategy)

const authenticate = passport.authenticate("jwt", { session: false })

module.exports = authenticate

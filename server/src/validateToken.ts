const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

let opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET,
}

passport.use(
    new JwtStrategy(opts, 
        async (token: { username: string; }, done: (arg0: unknown, arg1?: string) => void) => {
            try {
                return done(null, token.username)
            } catch (err) {
                done(err);
            }
}))

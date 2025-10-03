const oauth2orize = require("oauth2orize");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Client = require("../models/client");
const passport = require("../config/passport");

const server = oauth2orize.createServer();

server.grant(
    oauth2orize.grant.code((client, redirectUri, user, ares, done) => {
        const code = jwt.sign({ clientId: client.id, userId: user.id }, "secret", {
            expiresIn: "10m",
        });
        done(null, code);
    })
);

server.exchange(
    oauth2orize.exchange.code((client, code, redirectUri, done) => {
        try {
            const payload = jwt.verify(code, "secret");
            const token = jwt.sign(
                { clientId: client.id, userId: payload.userId },
                "secret",
                { expiresIn: "1h" }
            );
            done(null, token);
        } catch (err) {
            done(err);
        }
    })
);

exports.authorization = [
    passport.authenticate("basic", { session: false }),
    server.authorization((clientId, redirectUri, done) => {
        Client.findOne({ id: clientId }, (err, client) => {
            if (err) {
                return done(err);
            }
            if (!client) {
                return done(null, false);
            }
            return done(null, client, redirectUri);
        });
    }),
    server.decision(),
];

exports.token = [
    passport.authenticate(["basic", "client-basic"], { session: false }),
    server.token(),
    server.errorHandler(),
];
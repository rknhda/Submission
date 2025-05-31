const Hapi = require('@hapi/hapi')
const route = require('./route')
const init = async () => {
    const server = Hapi.server({
        port: 9000,
        host: 'localhost',
    })
    server.route(route);

    await server.start();
    console.log('Server running on %s', server.info.uri)
}
init().catch(err => {
    console.log(err);
});
    // "start-dev": "nodemon src/server.js",

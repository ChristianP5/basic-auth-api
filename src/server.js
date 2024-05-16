const Hapi = require('@hapi/hapi');
const routes = require('./routes');
const path = require('path');

const init = async () => {
  const server = Hapi.server({
    host: 'localhost',
    port: 5000,
    routes: {
        files: {
            relativeTo: path.join(__dirname, 'views')
        }
    }
  });

  await server.register([
    {
        plugin: require('@hapi/cookie'),
    },
    {
        plugin: require('@hapi/inert'),
    },
    {
        plugin: require('@hapi/vision'),
    }
  ])

  await server.views({
    engines: {
        hbs: require('handlebars'),
    },
    path: path.join(__dirname, 'views'),
  })

  server.auth.strategy('login', 'cookie', {
    cookie: {
        name: 'session',
        isSecure: false,
        password: 'abcdabcdabcdabcdabcdabcdabcdabcdabcd'
    },
    redirectTo: '/login',
    validate: async(request, session)=>{
        
        return { isValid: true };
    }
  })

  server.auth.default('login');

  server.route(routes);

  await server.start();
  console.log(`Server has started on ${server.info.uri}`);
};

process.on('unhandledRejection', (error) => {
  console.log(error.stack);
  process.exit(1);
});

init();

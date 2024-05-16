const {
  getRootHandler, notFoundHandler, getLoginHandler,
  getCssHandler, postLoginHandler, getLogoutHandler,
  getHomeHandler
} = require('./handler');

const routes = [
  {
    path: '/',
    method: 'GET',
    handler: getRootHandler,
    options: {
        auth: {
            mode: 'try',
        }
    }
  },
  {
    path: '/login',
    method: 'GET',
    handler: getLoginHandler,
    options: {
        auth: {
            mode: 'try',
        }
    }
  },
  {
    path: '/home',
    method: 'GET',
    handler: getHomeHandler,
  },
  {
    path: '/data',
    method: 'GET',
    handler: ()=>{
        return "<h1>Data</h1>";
    },
  },
  {
    path: '/css/{file}',
    method: 'GET',
    handler: getCssHandler,
    options: {
        auth: {
            mode: 'try',
        }
    }
  },
  {
    path: '/login',
    method: 'POST',
    handler: postLoginHandler,
    options: {
        auth: {
            mode: 'try',
        }
    }
  },
  {
    path: '/logout',
    method: 'GET',
    handler: getLogoutHandler,
  },
  {
    path: '/{any*}',
    method: '*',
    handler: notFoundHandler,
  },
];

module.exports = routes;

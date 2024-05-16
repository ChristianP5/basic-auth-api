const { users } = require('./authUser');

const getRootHandler = (request, h) => h.response({
  message: 'Welcome to Root!',
});

const notFoundHandler = (request, h) => {
  const response = h.response({
    message: 'You seem to be lost!',
  });

  response.code(404);
  return response;
};

const getLoginHandler = (request, h) => {

    if(request.auth.isAuthenticated){
        return h.redirect('/home');
    }else{
        return h.view('login');
    }
}

const postLoginHandler = (request, h) => {
    const { username, password } = request.payload;

    const index = users.findIndex(item => item.username === username);
    if(index !== -1){
        if(users[index].password === password){
            request.cookieAuth.set({
                username: username,
                password: password,
                name: users[index].name,
            })

            return h.redirect('/home');
        }else{
            return h.redirect('/login');
        }
    }else{
        return h.redirect('/login');
    }

}

const getLogoutHandler = (request, h)=>{
    request.cookieAuth.clear();
    return h.redirect('/login');
}

const getCssHandler = (request, h) => {
    const { file } = request.params;
    return h.file(`./css/${file}`);
}

const getHomeHandler = (request, h) => {
    const { name } = request.auth.credentials;
    const data = {
        name: name
    }
    return h.view('home', data);
}

module.exports = {
  getRootHandler, notFoundHandler, getLoginHandler, getCssHandler,
  postLoginHandler, getLogoutHandler, getHomeHandler
};

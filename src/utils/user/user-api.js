import axios from 'axios';

let loginRoute = 'http://localhost:5000/publisher/login';
let registerRoute = 'http://localhost:5000/publisher/create';

if (process.env.NODE_ENV === 'production') {
  loginRoute = 'https://zeeooh-backend.herokuapp.com/login';
  registerRoute = 'https://zeeooh-backend.herokuapp.com/create';
}

const databaseRoute = {
  login: loginRoute,
  register: registerRoute,
};

const userApi = {
  logUserIn: async (loginDetails) => {
    const response = await axios.post(databaseRoute.login, {
      ...loginDetails,
    });
    // console.log('login', response.data);
    if (response.data.message) {
      throw new Error('Wrong email or password');
    }
    console.log('login', response.data);
    return response.data;
  },
  registerUser: async (registerDetails) => {
    const response = await axios.post(databaseRoute.register, {
      ...registerDetails,
    });
    console.log('register', response.data);
    if (response.data.message) {
      throw new Error('Email is already taken');
    }
    return response.data;
  },
};

export default userApi;

import axios from 'axios';

let loginRoute = 'http://localhost:5000/publisher/login';
let registerRoute = 'http://localhost:5000/publisher/verify/email';

// if (process.env.NODE_ENV === 'production') {
//   loginRoute = 'https://zeeooh-backend.herokuapp.com/publisher/login';
//   registerRoute = 'https://zeeooh-backend.herokuapp.com/publisher/verify/email';
// }

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
      throw new Error(response.data.message);
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
      throw new Error(response.data.message);
    }
    return response.data;
  },
};

export default userApi;

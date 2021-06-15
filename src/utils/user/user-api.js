import axios from 'axios';

let loginRoute = 'http://localhost:5000/publisher/login';
let registerRoute = 'http://localhost:5000/publisher/verify/email';
let editPublisherProfileRoute = 'http://localhost:5000/publisher';

if (process.env.NODE_ENV === 'production') {
  loginRoute = 'https://zeeooh-backend.herokuapp.com/publisher/login';
  registerRoute = 'https://zeeooh-backend.herokuapp.com/publisher/verify/email';
  editPublisherProfileRoute = 'http://localhost:5000/publisher';
}

const backendRoute = {
  login: loginRoute,
  register: registerRoute,
  editPublisherProfile: editPublisherProfileRoute,
};

const userApi = {
  logUserIn: async (loginDetails) => {
    const response = await axios.post(backendRoute.login, {
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
    const response = await axios.post(backendRoute.register, {
      ...registerDetails,
    });
    console.log('register', response.data);
    if (response.data.message) {
      throw new Error(response.data.message);
    }
    return response.data;
  },
  editPublisherProfile: async (publisherId, updateProfile) => {
    const response = await axios.patch(
      `${backendRoute.editPublisherProfile}/${publisherId}/edit`,
      {
        ...updateProfile,
      }
    );
    console.log('update-profile', response.data);
    if (response.data.message) {
      throw new Error(response.data.message);
    }
    return response.data;
  },
};

export default userApi;

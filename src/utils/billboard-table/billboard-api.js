import axios from 'axios';

let billboardRouteUrl = 'http://localhost:5000/publisher/';

if (process.env.NODE_ENV === 'production') {
  billboardRouteUrl = 'https://zeeooh-backend.herokuapp.com/publisher/';
}

export const billboardRoute = {
  url: billboardRouteUrl,
};

const billboardDataApi = {
  get: async (url) => {
    const response = await axios.get(url);
    if (response.data.message) {
      throw new Error('Failed to fetch all billboards');
    }
    return response.data;
  },
  create: async (publisherId, billboardData) => {
    // console.log('fff', billboardData);
    const response = await axios.post(
      `${billboardRoute.url}${publisherId}/billboard/create`,
      billboardData
    );
    if (response.data.message) {
      throw new Error('Failed to create billboard');
    }
    return response.data;
  },
  edit: async (publisherId, billboardId, billboardData) => {
    // console.log('edit', billboardData);
    const response = await axios.patch(
      `${billboardRoute.url}${publisherId}/billboard/${billboardId}`,
      billboardData
    );
    if (response.data.message) {
      throw new Error('Failed to update billboard');
    }
    console.log(response.data);
    return response.data;
  },
  delete: async (publisherId, billboardId) => {
    const response = await axios.delete(
      `${billboardRoute.url}${publisherId}/billboard/${billboardId}`
    );
    if (response.data.message) {
      // console.log(Error);
      throw new Error('Failed to delete billboard');
    }
    console.log(response.data);
    return response.data;
  },
  billboard_general_get: async (url) => {
    const response = await axios.get(url);
    if (response.data.message) {
      throw new Error('Failed to fetch billboard general info');
    }
    return response.data;
  },
};

export default billboardDataApi;

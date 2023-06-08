export default {
  routes: [
    {
     method: 'GET',
     path: '/products',
     handler: 'products.find',
     config: {
       policies: [],
       middlewares: [],
     },
    },
  ],
};

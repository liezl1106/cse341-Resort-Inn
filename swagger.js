// const swaggerAutogen = require('swagger-autogen')();

// const doc = {
//   info: {
//     title: 'Users Api',
//     description: 'Users Api'
//   },
//   host: 'localhost:3000',
//   schemes: ['http', 'https']
// };

// const outputFile = './swagger.json';
// const endpointFiles = ['./routes/clientRoutes.js'];

// //this will generate swagger.json
// swaggerAutogen(outputFile, endpointFiles, doc);

// const swaggerAutogen = require('swagger-autogen')();

// const doc = {
//   info: {
//     title: 'Resort Inn API',
//     description: 'API documentation for Resort Inn'
//   },
//   host: 'localhost:3000',
//   schemes: ['http', 'https'],
//   securityDefinitions: {
//     oauth2: {
//       type: 'oauth2',
//       authorizationUrl: 'https://github.com/login/oauth/authorize',
//       flow: 'implicit',
//       scopes: {
//         read: 'Grants read access',
//         write: 'Grants write access'
//       }
//     }
//   }
// };

// const outputFile = './swagger.json';
// const endpointFiles = ['./routes/clientRoutes.js'];

// // this will generate swagger.json
// swaggerAutogen(outputFile, endpointFiles, doc);

require('dotenv').config();
const swaggerAutogen = require('swagger-autogen')();


// Set default environment if not set
//process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const doc = {
  info: {
    title: 'Resort Inn API',
    description: 'API documentation for Resort Inn'
  },
  schemes: process.env.NODE_ENV === 'production' ? ['https'] : ['http'],
  
  securityDefinitions: {
  oauth2: {
  type: 'oauth2',
  authorizationUrl: 'https://github.com/login/oauth/authorize',
  flow: 'implicit',
  scopes: {
  read: 'Grants read access',
  write: 'Grants write access'
      }
    }
  }
};

const outputFile = './swagger.json';
const endpointFiles = ['./routes/clientRoutes.js'];

console.log('Generating Swagger documentation...');
swaggerAutogen(outputFile, endpointFiles, doc)
  .then(() => {
    console.log('Swagger documentation generated successfully.');
    console.log('Current environment:', process.env.NODE_ENV);
  })
  .catch((err) => {
    console.error('Error generating Swagger documentation:', err);
  });

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

const swaggerAutogen = require('swagger-autogen')();

// Get the environment
const environment = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 3000;

// Function to determine the host
const getHost = () => {
  if (environment === 'production') {
    // Use the same host as your callback URL but remove the protocol
    const callbackUrl = new URL(process.env.CALLBACK_URL);
    return callbackUrl.host;
  }
  return `localhost:${port}`;
};

const doc = {
  info: {
    title: 'Resort Inn API',
    description: 'API documentation for Resort Inn'
  },
  host: getHost(),
  schemes: environment === 'production' ? ['https'] : ['http', 'https'],
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

// this will generate swagger.json
swaggerAutogen(outputFile, endpointFiles, doc);

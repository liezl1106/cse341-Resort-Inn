// const router = require('express').Router();
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('../swagger.json');
// router.use('/api-docs', swaggerUi.serve);
// router.use('/api-docs', swaggerUi.setup(swaggerDocument));

// module.exports = router;

const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
require('dotenv').config();

const swaggerUiOptions = {
  oauth2RedirectUrl: `${process.env.BASE_URL}/api-docs`,
  oauth: {
    clientId: process.env.GITHUB_CLIENT_ID,
    additionalQueryStringParams: {
      state: Buffer.from('/api-docs').toString('base64')
    }
  }
};

router.use('/api-docs', swaggerUi.serve);
router.use('/api-docs', swaggerUi.setup(swaggerDocument, swaggerUiOptions));

module.exports = router;

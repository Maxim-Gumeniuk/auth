import swaggerJsDocs from 'swagger-jsdoc';

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'API',
            version: '1.01'
        }
    },
    apis: ['..server.ts'],
};

export const swagerDocs = swaggerJsDocs(swaggerOptions);

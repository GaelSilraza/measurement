export const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Measurement',
      version: '1.0.0',
      description: 'documentação do Measurement',
      contact: {
        name: 'Gabriel da Silveira Souza',
        email: 'gabrielss1298@hotmail.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Documentação',
      },
    ],
  },
  apis: [
    './src/router.ts',
    './src/modules/*/*.router.ts'
  ],
};
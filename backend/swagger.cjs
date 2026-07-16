const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });

const doc = {
    info: {
        version: '1.0.0',
        title: 'Todo Application API',
        description: `REST API for the Todo Application.
        
        Features: 
        - Create tasks
        - Update tasks
        - Delete tasks
        - Search tasks
        - Filter tasks
        - Sort by priority`,
        contact: {
            name: 'Mileta Lvova',
            email: 'mileta279@gmail.com',
        },
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Local development server',
        },
    ],
    components: {
        schemas: {
            ApiError: {
                type: 'object',
                properties: {
                    status: { type: 'string', example: 'error' },
                    statusCode: { type: 'integer', example: 400 },
                    message: { type: 'string', example: 'Bad Request' },
                },
            },
            Task: {
                type: 'object',
                properties: {
                    name: { type: 'string', example: 'Buy groceries' },
                    description: {
                        type: 'string',
                        example: 'Milk, eggs, whole wheat bread, and chicken breasts',
                    },
                    priority: { type: 'integer', example: 5 },
                    completed: { type: 'boolean', example: false },
                },
            },
            TaskInput: {
                type: 'object',
                properties: {
                    name: { type: 'string', example: 'Buy groceries' },
                    description: {
                        type: 'string',
                        example: 'Milk, eggs, whole wheat bread, and chicken breasts',
                    },
                    priority: { type: 'integer', example: 5 },
                },
            },
            TaskUpdateInput: {
                type: 'object',
                properties: {
                    name: { type: 'string', example: 'Buy groceries' },
                    description: {
                        type: 'string',
                        example: 'Milk, eggs, whole wheat bread, and chicken breasts',
                    },
                    priority: { type: 'integer', example: 5 },
                    completed: { type: 'boolean', example: false },
                },
            },
        },
        responses: {
            BadRequest: {
                description: 'Bad Request',
                content: {
                    'application/json': {
                        schema: { $ref: '#/components/schemas/ApiError' },
                    },
                },
            },
            NotFound: {
                description: 'Not found',
                content: {
                    'application/json': {
                        schema: { $ref: '#/components/schemas/ApiError' },
                    },
                },
            },
            InternalServerError: {
                description: 'Internal Server Error',
                content: {
                    'application/json': {
                        schema: { $ref: '#/components/schemas/ApiError' },
                    },
                },
            },
        },
    },
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/routes/tasks.ts'];

swaggerAutogen(outputFile, endpointsFiles, doc)
    .then(() => {
        console.log('Swagger documentation generated successfully.');
    })
    .catch((err) => {
        console.error('Error generating Swagger documentation:', err);
    });

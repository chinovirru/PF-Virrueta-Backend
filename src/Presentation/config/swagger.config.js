const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Documentación de API Commerce',
            description: 'API desarrollada para la interacción con e-commerce'
        }
    },
    apis: ['./docs/**/*.yaml']
}

export {swaggerOptions}
const express = require('express');
const { request } = require('express');

const app = express();

app.get('/', (request, response) => {
    return response.json({
        mensage: "Hello World"
    });
});

app.post('/projects', (request, response) => {
    return response.json([
        'Projeto 1',
        'Projeto 2',
        'Projeto 333',
    ]);
});

app.listen(8080, (request, response) => {
    console.log('Banck-end Started');
});
const express = require('express');
const { uuid, isUuid } = require('uuidv4')

const app = express();

app.use(express.json());

/**
 * Métodos HTTP:
 * 
 * GET: Buscar uma informação do back-end
 * POST: Criar uma informação no back-end
 * PUT/PATCH: Alterar uma informação no back-end
 * DELETE: Deletar uma informação no back-end
 */

 /**
  * Tipos de parâmetros
  * 
  * Query Params: Filtros e paginação (parâmetros passados na url da página)
  * Route Params: Identificar recursos na hora de atualizar ou deletar
  * Request Body: Conteúdo na hora de criar ou editar um recurso
  */

  /**
   * Middleware
   * 
   * Interceptador de requisições que pode interromper totalmente a requisição ou alterar dados da requisição
   */


 const projects = [];

function logRequests(request, response, next){
    const { method, url } = request;
    const logLabel = `[${method.toUpperCase()}] ${url}`;

    console.time(logLabel);

    next();

    console.timeEnd(logLabel);
}

function validateProjectID(request, response, next){
    const { id } = request.params.app;
    if(!isUuid(id)) {
        return response.status(400).json({ error: 'invalid project ID.' });
    }
    return next();
}

app.use(logRequests);
app.use('/projects/:id', validateProjectID);

/**
 * app.get('/projects', (request, response) => {
    /**
     *  const query = request.query;
        const { title, owner } = request.query;
        console.log(query);
        console.log(title);
        console.log(owner);
    

    return response.json( projects );
});
*/

app.get('/projects', (request, response) => {
    const { title } = request.query;
    const results = title
        ? projects.filter(project => project.title.includes(title))
        : projects;

    return response.json( results );
});

app.post('/projects', (request, response) => {
    const { title, owner } = request.body;

    const project = { id: uuid(), title, owner };

    projects.push(project);

    return response.json(project);
});

/**
 *  app.put('/projects/:id', (request, response) => {
    const params = request.params;
    console.log(params);

    const body = request.body;
    const { title, owner } = request.body;
    console.log(body);
    console.log(title);
    console.log(owner);
    
    return response.json([
        'Projeto 1',
        'Projeto 2',
        'Projeto 333',
    ]);
});
*/

app.put('/projects/:id', validateProjectID, (request, response) => {
    const { id } = request.params;
    
    const projectIndex = projects.findIndex(project => project.id == id);

    if(projectIndex < 0 ){
        return response.status(400).json({ error: 'Project not found.' });
    }
    else{
        const { title, owner } = request.body;
        const project = { id, title, owner };
        projects[projectIndex] = project;
        return response.json(project);
    }
    
});

app.delete('/projects/:id', validateProjectID, (request, response) => {
    //const params = request.params;
    const { id } = request.params;
    //console.log(params);
    //console.log(id);

    const projectIndex = projects.findIndex(project => project.id == id);

    if(projectIndex < 0 ){
        return response.status(400).json({ error: 'Project not found.' });
    }
    else{
        projects.splice(projectIndex, 1)
        return response.status(204).send();
    }
});

app.listen(8080, (request, response) => {
    console.log('🟢 🚀 - Banck-end Started');
});
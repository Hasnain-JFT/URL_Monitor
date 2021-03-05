let environment ={};

environment.staging = {
    'port' : 9000 , 
    'mode' : 'Staging mode'
}
environment.production = {
    'port' : 5000, 
    'mode' : 'Production mode',
}

let currentEnvironment =typeof(process.env.NODE_ENV) == 'string'? process.env.NODE_ENV.toLowerCase() : '';
let exportEnvironment = typeof(environment[currentEnvironment]) == 'object' ? environment[currentEnvironment] : environment.staging;


module.exports = exportEnvironment;
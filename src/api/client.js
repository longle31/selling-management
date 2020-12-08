
const host = document.location.host;

export async function client (endpoint, {body, ...customConfig}){
    const headers = {'Content-Type': 'application/json'};
    const config ={
        method : body? 'POST': 'GET',
        ...customConfig,
        headers:{
            ...headers,
            ...customConfig.headers
        }
    }

    if(body){
        config.body = JSON.stringify(body);
    }
    
    
    let data;
    try {
        const response = await fetch(`http://${host}/${endpoint}`, config);
        // if(response.status === 401){
        //     logout();
        //     window.location.assign(window.location);
        // }
        data = await response.json();
        if(response.ok){
            return data;
        }
        throw new Error(response.statusText);
    } catch (err) {
        return Promise.reject(err.message ? err.message : data)
    }
}



client.get = function(endpoint, customConfig = {}){
    return client(endpoint, {...customConfig, method: 'GET'});
}

client.post = function(endpoint,body, customConfig = {}){
    return client(endpoint, {...customConfig,body, method: 'POST'});
}

client.put = function(endpoint,body, customConfig = {}){
    return client(endpoint, {...customConfig, body, method: 'PUT'})
}

client.delete = function(endpoint, customConfig = {}){
    return client(endpoint, {...customConfig, method:'DELETE'});
}


export const gitHubService = { 
    getAllUserService,
    getAllRepositoriesService,
    getRepositoryDetails,
    getSHAService
};

function getAllUserService(search) { 
    //https://api.github.com/users/anu/starred
    return fetch(`https://api.github.com/users/${search}`).then(
        res =>res.json()).then((responseJson) =>{
        return responseJson;
    }).catch((error) =>{
        return error
    })
}

function getRepositoryDetails(login, name){
    return fetch('https://api.github.com/repos/'+login+'/'+name).then(
        res =>res.json()).then((responseJson) =>{
        return responseJson;
    }).catch((error) =>{
        return error
    })
}

function getAllRepositoriesService(url){
    console.log(url)
    return fetch(url).then(
        res =>res.json()).then((responseJson) =>{
        return responseJson;
    }).catch((error) =>{
        return error
    })
}

function getSHAService(login, name){
    return fetch('https://api.github.com/repos/'+login+'/'+name+'/stats/contributors').then(
        res =>res.json()).then((responseJson) =>{
        return responseJson;
    }).catch((error) =>{
        return error
    })
}


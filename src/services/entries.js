import axios from 'axios'

const baseUrl = '/api/persons'

const getAll = async () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = async newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const update = async (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    console.log(request.data, request)
    return request.then(response => response.data)
}

const deleteEntry = async id => {
    const request = axios.delete(`${baseUrl}/${id}`)    
    return request.then(response => response.data)
}


export default { getAll, create, update, deleteEntry }

import axios from "axios";

//configure com o endereco da api, se for local colocar o ip da maquina
const api = axios.create({
    baseURL: 'http://192.168.0.83:3333'
})

export { api };
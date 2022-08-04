import axios from 'axios';

export const GET_ALL_COUNTRIES = "GET_ALL_COUNTRIES";
export const GET_COUNTRY = "GET_COUNTRY";
export const GET_ALL_ACTIVITIES = "GET_ALL_ACTIVITIES";
export const FILTER_BY_CONTINENT = "FILTER_BY_CONTINENT";
export const FILTER_BY_ACTIVITY = "FILTER_BY_ACTIVITY";
export const FILTER_BY_NAME = "FILTER_BY_NAME";
export const FILTER_BY_POPULATION = "FILTER_BY_POPULATION";
export const SEARCH_COUNTRIES = "SEARCH_COUNTRIES";


const useDB = axios.create({
    baseURL: process.env.REACT_APP_BASEURL
})

export const obtenerPaises = () => {
    return async (dispatch) => {
        let pedidoDB = await useDB.get("/countries")
        // let pedidoDB = await axios.get("http://localhost:3001/countries")
        dispatch({type: "GET_ALL_COUNTRIES", payload: pedidoDB.data})
    }
}

export const obtenerPais = (id) => {
    return async (dispatch) => {
        let pedidoDB = await useDB.get(`/countries/${id}`)
        dispatch({type:"GET_COUNTRY", payload: pedidoDB.data})
    }
}

export const buscarPaises = (search) => {
    return async (dispatch) => {
        let pedidoDB = await useDB.get(`/countries?name=${search}`)
        dispatch({
            type: "SEARCH_COUNTRIES",
            payload: pedidoDB.data
        })
    }
}

export const obtenerActividades = () => {
    return async (dispatch) => {
        let pedidoDB = await useDB.get("/activities")
        // let pedidoDB = await axios.get("http://localhost:3001/countries")
        dispatch({type: "GET_ALL_ACTIVITIES", payload: pedidoDB.data})
    }
}

export const filtrarPaisPorContinente = (payload) => {
    console.log(payload);
    return{
        type: "FILTER_BY_CONTINENT",
        payload
    }
}

export const filtrarPaisPorActividad = (payload) => {
    return{
        type:"FILTER_BY_ACTIVITY",
        payload
    }
}

export const filtrarPaisPorNombre = (payload) => {
    return{
        type:"FILTER_BY_NAME",
        payload
    }
}

export const filtrarPaisPorPoblacion = (payload) => {
    return{
        type:"FILTER_BY_POPULATION",
        payload
    }
}




// export const crearActividad = () => {
//     return async (dispatch) => {
//         await axios.post("http:localhost:3001/activities", obj)
//     }
// }
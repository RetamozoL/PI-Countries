import {
    GET_ALL_COUNTRIES,
    GET_COUNTRY,
    GET_ALL_ACTIVITIES,
    FILTER_BY_CONTINENT,
    FILTER_BY_NAME,
    FILTER_BY_POPULATION,
    FILTER_BY_ACTIVITY,
    SEARCH_COUNTRIES
} from './actions'

let initialState = {
    paises:[],
    copiaPaises: [],
    actividades:[],
    pais: {}
}

export default function rootReducer(state = initialState, action){
    switch(action.type){

        case GET_ALL_COUNTRIES: 
            return {
                ...state,
                paises: action.payload,
                copiaPaises: action.payload
            }

        case GET_COUNTRY:
            return {
                ...state,
                pais: action.payload
            }

        case SEARCH_COUNTRIES:
            return {
                ...state,
                paises: action.payload
            }

        case GET_ALL_ACTIVITIES:
            return {
                ...state,
                actividades: action.payload
            }

        case FILTER_BY_CONTINENT:
            const allCountries = state.copiaPaises
            const statusFilter = action.payload === 'all' ? allCountries : allCountries.filter(el => el.continente === action.payload)
            
            return {
                ...state,
                paises: statusFilter
            }


        case FILTER_BY_NAME:
            let ordenArray = action.payload === 'asc' ?
                state.paises.sort(function (a, b){
                    if (a.name > b.name){
                        return 1;
                    }
                    if (b.name > a.name){
                        return -1;
                    }
                    return 0;
                }) :
                state.paises.sort(function (a, b){
                    if (a.name > b.name){
                        return -1;
                    }
                    if (b.name > a.name){
                        return 1;
                    }
                    return 0;
                }) 
            return {
                ...state,
                paises: ordenArray
            }

            
        case FILTER_BY_POPULATION:
            let ordenArrayPoblacion = action.payload === 'asc' ?
                state.paises.sort(function (a, b){
                    if (a.poblacion > b.poblacion ){
                        return 1;
                    }
                    if (b.poblacion  > a.poblacion ){
                        return -1;
                    }
                    return 0;
                }) :
                state.paises.sort(function (a, b){
                    if (a.poblacion > b.poblacion ){
                        return -1;
                    }
                    if (b.poblacion  > a.poblacion ){
                        return 1;
                    }
                    return 0;
                }) 
            return {
                ...state,
                paises: ordenArrayPoblacion
            }
        case FILTER_BY_ACTIVITY:
            let allCountriesClone = [...state.paises];
            let filtered = allCountriesClone.filter(c => c.activities?.filter(a => a.nombre === action.payload ).length >0)
            return{
                ...state,
                paises: filtered
            }
        default:
            return state;
    }
}
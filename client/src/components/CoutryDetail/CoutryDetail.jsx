import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import style from './CoutryDetail.module.css'


export default function CoutryDetail (){


    const [country, setCountry] = useState(null)

    let { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:3001/countries/${id}`)
        .then((respuesta) => {
            setCountry(respuesta.data)
        })
    }, [])

    return(
        <div className={style.container}>
            <div className={style.containerDouble}>
            {country ?
                <div className={style.contenedorPais}>
                    <h2 className={style.nombrepais}>{country.name}</h2>
                    <div>
                        <img style={{borderRadius: '50px'}} src={country.img} alt="flag" />
                    </div>
                        <div>
                            <table className={style.table}>
                                <tbody>
                                    <tr>
                                        <td className={style.columntitle}>Codigo Pais:</td>
                                        <td className={style.columninfo}>{country.id}</td>
                                    </tr>
                                    <tr>
                                        <td>Continente:</td>
                                        <td>{country.region}</td>
                                    </tr>
                                    <tr>
                                        <td>Capital:</td>
                                        <td>{country.capital}</td>
                                    </tr>
                                    <tr>
                                        <td>Subregion:</td>
                                        <td>{country.subregion}</td>
                                    </tr>
                                    <tr>
                                        <td>Area:</td>
                                        <td>{country.area}</td>
                                    </tr>
                                    <tr>
                                        <td>Poblacion:</td>
                                        <td>{country.population}</td>
                                    </tr>                       
                                </tbody>
                            </table>                         
                        </div>
                </div>
                :
                <h3>cargando</h3>
                
            }
            <div>
                <h1 className={style.actividad}>Actividades</h1>
                {
                    country ?
                    country.activities.length > 0?    
                    country.activities.map((actividad) => (
                        <div >
                            <h2 className={style.actividadnombre}>{actividad.nombre}</h2>
                            <table className={style.table2}>
                                <tbody>
                                    <tr>
                                        <td>Duracion:</td>
                                        <td>{actividad.duracion}</td>
                                    </tr>
                                    <tr>
                                        <td>Dificultad:</td>
                                        <td>{actividad.dificultad}</td>
                                    </tr>
                                    <tr>
                                        <td>Temporada:</td>
                                        <td>{actividad.temporada}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    ))
                    : 
                    <h3>No hay actividades</h3>
                    :
                    <h3>Cargando</h3>
                }
            </div>
        </div>        
    </div>
    )
}




import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import BotonVolver from '../BotonVolver/BotonVolver'
import axios from 'axios'
import { obtenerPaises } from '../../redux/actions'
import style from './Form.module.css'


export default function Form(){
    const dispatch = useDispatch()
    //esto es un objeto --> le envio el objeto al --> servidor
    const [actividad, setActividad] = useState({
        nombre: "",
        dificultad: "",
        duracion: "",
        temporada: "",
        idPais: []
    })
    const [errors, setErrors] = useState({});
    
    const allCountries = useSelector((state) => state.paises)

    //Object.keys(erroresFormulario).length < 1 ? false : true
    

    // form --->

    // completamos --> le realizamos cambios  --> 1 funcion para escribir 
    // entregamos --> lo enviamos a quien corresponda para que se encargue (backend) --> 1 funcion para enviarlo

    useEffect(() =>{
        dispatch(obtenerPaises())
    }, [dispatch])


    function validar(actividad){
        let errors = {};

        if(!actividad.nombre){
            errors.nombre = 'se require un nombre'
        } else if(/[0-9]/.test(actividad.nombre) || /[-_<>,;.:{}]/.test(actividad.nombre)){
            errors.nombre = "Nombre invalido"
        } 

        if(actividad.dificultad === ''){
            errors.dificultad = "Debe seleccionar una dificultad"
        }
        
        if(!actividad.duracion){
            errors.duracion = "Debe ingresar una duracion"
        } else if(!/\d/.test(actividad.duracion)){
            errors.duracion = "Debe ser un numero"
        } else if(actividad.duracion < 1 || actividad.duracion > 24)
        errors.duracion = "Debe ser un numero entre 1 y 24"

        if(!actividad.temporada){
            errors.temporada = "Debe seleccionar una temporada"
        }
        
        if(actividad.idPais.length < 1){
            errors.idPais = "Debe seleccionar almenos 1 pais"
        }
        return errors;
    }


    function handleChange(e){
        setActividad({
            ...actividad,
            [e.target.name]:e.target.value,
        })
        setErrors(validar({
            ...actividad,
            [e.target.name]:e.target.value
        }));
        console.log(actividad);
        
    }

    function handleId(e){
        let exists = actividad.idPais.find((c) => c === e.target.value);
        if(!exists){
            // setErrors(utils.validate({...input, [e.target.name]: e.target.value}))
            setActividad({...actividad, [e.target.name]: [...actividad.idPais, e.target.value]});
        }   
    }

    function handleTemporadas(e){
        setActividad({
            ...actividad,
            temporada:e.target.value
        })
    }

    function handleDificultad(e){
        setActividad({
            ...actividad,
            dificultad:e.target.value
        })
    }

    async function handleSubmit(e){
        e.preventDefault()
        setErrors(validar(actividad));
        if(
            actividad.nombre &&
            actividad.dificultad &&
            actividad.duracion &&
            actividad.temporada &&
            actividad.idPais
        ){
        await axios.post("http://localhost:3001/activities", actividad);
        window.alert("Actividad creada con exito!");
        window.location.reload();
        } else{ window.alert("Alguno de los campos esta vacio")}   
    }
    

    const handleDelete = (e) => {
        let country = actividad.idPais.filter((c) => c !== e.target.value);
        setActividad({
            ...actividad,
            idPais: country
        })
    }


    return (
        <div className={style.all}>
            <BotonVolver  />
            <div className={style.containerall}>
                
                <form className={style.formcontainer} onSubmit={handleSubmit}>
                    <div className={style.inputitem}>
                        <label>Nombre:</label>
                        <input className={style.inputnombre} name="nombre" value={actividad.nombre} onChange={handleChange}/>
                        {errors.nombre && (<p className={style.errors}>{errors.nombre}</p>)}
                        {/* --------------- */}
                        <label className={style.labeldificultad}>Dificultad:</label>
                        <select 
                            className={style.selectdificultad}
                            name="dificultad" 
                            value={actividad.dificultad}
                            onChange={handleDificultad}
                            required
                        >
                            <option value={1}>Dificultad</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </select>
                        {errors.dificultad && (<p className={style.errors}>{errors.dificultad}</p>)}
                        {/* --------------- */}
                        <label>Duración:</label>
                        <input className={style.inputduracion} name="duracion" value={actividad.duracion} onChange={handleChange}></input>
                        {errors.duracion && (<p className={style.errors}>{errors.duracion}</p>)}
                        {/* --------------- */}
                        <label>Temporada:</label>
                        <select 
                            className={style.selecttemporada}
                            name="temporada" 
                            value={actividad.temporada}
                            onChange={handleTemporadas}
                            required
                            
                        >   
                            <option value={''}>Temporada</option>
                            <option value={'Verano'}>Verano</option>
                            <option value={'Otoño'}>Otoño</option>
                            <option value={'Invierno'}>Invierno</option>
                            <option value={'Primavera'}>Primavera</option>
                        </select>
                        {errors.temporada && (<p className={style.errors}>{errors.temporada}</p>)}
                        {/* --------------- */}
                        <label>Paises:</label>
                        <select 
                            className={style.selectpaises}
                            name="idPais" 
                            value={actividad.idPais[actividad.idPais.length - 1] ?? ''} 
                            onChange={handleId} 
                        >
                                <option value=''>Countries Select</option>
                                {allCountries?.map(country => (
                                    <option key={country.id} value={country.id}>{country.name}</option>
                                    ))}
                        </select> 
                        {errors.idPais && (<p className={style.errors}>{errors.idPais}</p>)}

                        <div>
                            <h3>Paises en donde agregar la actividad</h3>
                            <table >
                            <thead>
                                <tr>
                                    <th>Paises</th>
                                    <th>para agregar</th>
                                </tr>
                            </thead>
                            <tbody className={style.paises}>
                                {actividad.idPais &&
                                actividad.idPais.map((c) => (
                                    <tr key={c}>
                                    <td>{c}</td>
                                    <td><button onClick={handleDelete} 
                                    value={c}>Eliminar</button></td>
                                    </tr>
                                ))}
                            </tbody>
                            </table>
                        </div>            
                        {/* --------------- */}
                        {
                        Object.keys(errors).length === 0 ?
                        <input type="submit" value="Crear"/>
                        :
                        <></>
                        }                   
                    </div>
                </form>
            </div>
        </div>
    )
}


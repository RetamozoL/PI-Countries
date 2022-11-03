import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from '../Card/Card.jsx';
import { Link } from 'react-router-dom';
import { obtenerPaises, filtrarPaisPorContinente, filtrarPaisPorNombre, filtrarPaisPorActividad, obtenerActividades, filtrarPaisPorPoblacion } from '../../redux/actions'
import Paginado from '../Paginado/Paginado';
import style from './AllCards.module.css'

export default function AllCards(){

    const dispatch = useDispatch()
    const estadoPais = useSelector((state) => state.paises)
    const [orden, setOrden] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [countriesPerPage, setCountriesPerPage] = useState(10)
    const indexOfLastCountry = currentPage * countriesPerPage
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage
    const currentCountries = estadoPais.slice(indexOfFirstCountry,indexOfLastCountry)
    const actividades = useSelector(state => state.actividades)
    
    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    
    useEffect(() =>{
        dispatch(obtenerPaises())
    }, [dispatch])

    
    useEffect(() =>{
        dispatch(obtenerActividades())
    }, [dispatch])

    function handleClick(e){
        e.preventDefault();
        dispatch(obtenerPaises())     
    }

    function handleNext(e){
        e.preventDefault();
        if(currentPage < Math.ceil(estadoPais.length/countriesPerPage))setCurrentPage(currentPage + 1)
    }

    function handlePrev(e){
        e.preventDefault();
        if(currentPage>1) setCurrentPage(currentPage - 1)
    }
    
    function handleSort(e) {
        e.preventDefault();
        dispatch(filtrarPaisPorNombre(e.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    }

    function handleSortPopulation(e){
        e.preventDefault();
        dispatch(filtrarPaisPorPoblacion(e.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    }

    function handleFilterContinent(e){
        dispatch(filtrarPaisPorContinente(e.target.value));
        setCurrentPage(1);
    }

    function handlefilteredByActivity(e){
        e.preventDefault();
        dispatch(filtrarPaisPorActividad(e.target.value))
        setCurrentPage(1);
    }

    console.log(estadoPais);

    return (
        <div>
            <nav>
                    <div className={style.filtros}>
                        <div> 
                            <label className={style.labelnombre}>Filtrar por nombre</label>
                            <select className={style.selectnombre} onChange={e => handleSort(e)}>
                                <option value='asc'>A-Z</option>
                                <option value='desc'>Z-A</option>
                            </select>
                        </div>
                        <div>
                            <label className={style.labelpoblacion}>Filtrar por poblacion</label>
                            <select className={style.selectpoblacion} onChange={e => handleSortPopulation(e)}>
                                <option value='asc'>Ascendente</option>
                                <option value='desc'>Descendente</option>
                            </select> 
                        </div>
                        <div>
                            <label className={style.labelcontinente}>Filtrar por continente</label>
                            <select className={style.selectcontinente} onChange={e => handleFilterContinent(e)}>
                                <option value='all'>Seleccione el contiente</option>
                                <option value='North America'>North America</option>
                                <option value='South America'>South America</option>
                                <option value='Europe'>Europa</option>
                                <option value='Africa'>Africa</option>
                                <option value='Asia'>Asia</option>                          
                                <option value='Oceania'>Oceania</option>
                                <option value='Antarctica'>Antarctica</option>
                            </select>
                        </div>
                        <div>                       
                            <label className={style.labelactividad}>Filtrar por Actividad</label>
                            <select className={style.selectactividad} onChange={handlefilteredByActivity}> 
                                <option value='all'>Seleccione la actividad</option>
                                {actividades.map((act) => (
                                    <option key={act.id} value={act.nombre}>{act.nombre}</option>
                            ))}
                            </select> 
                        </div>
                        <button className={style.reset} onClick={e=>{handleClick(e)}}>
                            RESETEAR FILTROS
                        </button>   
                    </div>            
            </nav>
            <div className={style.paginadoContenedor}>
                <button className={style.NextPrev} onClick={e=>{handlePrev(e)}}>anterior</button>
                <Paginado 
                    className={style.paginado}
                    countriesPerPage = {countriesPerPage}
                    estadoPais = {estadoPais.length}
                    paginado = {paginado}
                    setCurrentPage = {setCountriesPerPage}
                    currentPage = { currentPage}
                />
                <button className={style.NextPrev} onClick={e=>{handleNext(e)}}>siguiente</button>
            </div>
            <div className={style.contenedor}>
                {currentCountries.length > 0 ? currentCountries.map(pais => 
                    <Link className={style.link} key={pais.id} to={`/detail/${pais.id}`}>
                        <Card name={pais.name} img={pais.img} region={pais.continente} poblacion={pais.poblacion} />
                    </Link>
                ) : <h2>No hay nada</h2>}
            </div>
            <div className={style.paginadoContenedor2}>
                <button className={style.NextPrev} onClick={e=>{handlePrev(e)}}>anterior</button>
                <Paginado 
                    className={style.paginado}
                    countriesPerPage = {countriesPerPage}
                    estadoPais = {estadoPais.length}
                    paginado = {paginado}
                    setCurrentPage = {setCountriesPerPage}
                    currentPage = { currentPage}
                />
                <button className={style.NextPrev} onClick={e=>{handleNext(e)}}>siguiente</button>
            </div>
        </div>
    )
}
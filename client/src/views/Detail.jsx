import React from 'react';
import ContryDetail from '../components/CoutryDetail/CoutryDetail';
import Navbar from '../components/Navbar/Navbar';
import style from './Detail.module.css'

export default function Detail(){
    return(
        <div className={style.container}>
            <Navbar/>
            <h1>Pais</h1>
            <ContryDetail />
        </div>
    )
}
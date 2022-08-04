import React from 'react';
import AllCards from "../components/AllCards/AllCards";
import Navbar from '../components/Navbar/Navbar';
import style from './Home.module.css'



export function Home(){
    return(
        <div className={style.fondo}>
            <Navbar />
            <div className={style.div}><AllCards /></div>
            
        </div>
    );
}

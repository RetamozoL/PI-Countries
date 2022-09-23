import React from "react";
import styles from "./Navbar.module.css"
import SearchBar from '../SearchBar/SearchBar.jsx';



export default function Navbar(){

    return(
        <nav className={styles.all}>  
            <h2 className={styles.titulo}>Countries</h2>
            <ul className={styles.menu}>
                <li><a href="/home">Inicio</a></li>
                <li>
                    <SearchBar/>
                </li>
                <li><a href="/crear">Crear Actividad</a></li>
            </ul>
        </nav>
    )
}
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { buscarPaises } from "../../redux/actions";
import styles from "./SearchBar.module.css"

export default function SearchBar(){
    const [search, setSearch] = useState('');
    let dispatch = useDispatch();

    function handleSubmit(e){
        e.preventDefault();
        dispatch(buscarPaises(search))
    }

    function handleChange(e) {
        e.preventDefault();
        setSearch(e.target.value)
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input  type="text" onChange={handleChange} value={search} placeholder="Nombre del pais" className={styles.search}/>
                <input  type="submit" value="Buscar" className={styles.button2}/>
            </form>
        </div>
    )
}
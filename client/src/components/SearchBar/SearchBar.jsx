import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { buscarPaises } from "../../redux/actions";

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
                <input  type="text" onChange={handleChange} value={search} placeholder="Nombre del pais"/>
                <input  type="submit" value="Buscar"/>
            </form>
        </div>
    )
}
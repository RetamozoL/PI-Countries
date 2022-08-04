import React from "react";
import style from './Paginado.module.css'


export default function Paginado({countriesPerPage, estadoPais, paginado}){
    const pageNumbers = []
    for (let i=1; i<=Math.ceil(estadoPais/countriesPerPage);i++){
        pageNumbers.push(i)
    }

    return(
        <nav>
            <ul className={style.paginado}>
                { pageNumbers.map(number => 
                    <li className={style.paginadoli} key={number}>
                        <button className={style.paginadoa} onClick={() => paginado(number)}>
                            {number}
                        </button>
                    </li>
                )}
            </ul>
        </nav>
    )
}
import React from 'react'
import { Link } from 'react-router-dom'
import style from './BotonVolver.module.css'

export default function BotonVolver(){
    return(
        <div className={style.all}>
            <Link to = '/home'>
                <button className={style.button}>Home</button>
            </Link>
        </div>
    )
}
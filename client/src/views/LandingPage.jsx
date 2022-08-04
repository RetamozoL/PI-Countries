import React from 'react'
import { Link } from 'react-router-dom'
import style from './LandingPage.module.css'

export function LandingPage(){
    return(
        <div className={style.container}>
            <Link to = '/home'>
                <button className={style.buttonhome}>APP COUNTRIES</button>
            </Link>
        </div>
    )
}
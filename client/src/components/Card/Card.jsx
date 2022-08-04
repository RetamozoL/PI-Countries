import React from 'react';
import style from './Card.module.css'

export default function Card({name, img, region}){
    return(
        <div className={style.body}>
            <div className={style.container}>
                <div className={style.card}>
                    <img  className={style.imagen} src={img} alt="flag" />
                    <h3 className={style.nombre}> {name} </h3>
                    <h5 className={style.region}>{region}</h5>
                </div>  
            </div>
        </div>
    )
}


// <Card name={} img={}  region={} />
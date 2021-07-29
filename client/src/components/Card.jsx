import React from 'react';

export default function Card({name, image, nickname}){
    return(
        <div>
            <img src={image} alt='Img personaje' width="200px" height="250px"/>
            <h3>{name}</h3>
            <h5>{nickname}</h5>
        </div>
    )
}
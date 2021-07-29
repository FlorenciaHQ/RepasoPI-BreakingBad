import React from 'react';
import {  useEffect } from 'react';//useState
import { useDispatch, useSelector } from 'react-redux';
import { getCharacters } from '../actions';
import { Link } from 'react-router-dom';
import Card from './Card'

export default function Home() {

    const dispatch = useDispatch()
    const allCharacters = useSelector((state) => state.characters)

    useEffect(() => { //cuando el componente se monta
        dispatch(getCharacters())
    },[dispatch])

    function handleOnClick(e) {
        e.preventDefault()
        dispatch(getCharacters())
    }

    return (
        <div>
            <h1>BREAKING BAD</h1>
            <div>
            <Link to='/character'>Crear personaje</Link>
            </div>
            <button onClick={e => handleOnClick(e)}>
                Mostrar todos los personajes
            </button>
            <div>
                <select>
                    <option value='asc'>Ascendente</option>
                    <option value='des'>Descendente</option>
                </select>
                <select>
                    <option value='All'>Todos</option>
                    <option value='Alive'>Vivos</option>
                    <option value='Deceased'>Muertos</option>
                    <option value='Presumed dead'>Presuntamente muertos</option>
                    <option value='Unknown'>Desconocido</option>
                </select>
                <select>
                    <option value='all'>Todos</option>
                    <option value='created'>Creados</option>
                    <option value='api'>Existentes</option>
                </select>
                {allCharacters.map((c) => {
                    console.log("gfhjklhgfdsfghjkl")
                    return (
                        <fragment>
                            <Link to={"/home/" + c.id}>
                                <Card name={c.name} image={c.img} nickname={c.nickname} key={c.id} />
                            </Link>
                        </fragment>
                    );
                })}
            </div>
        </div>
    )
}

// Ruta principal: debe contener

// [ ] Input de búsqueda para encontrar personajes por nombre
// [ ] Área donde se verá el listado de personajes. Deberá mostrar su:
// Imagen
// Nombre
// Nickname
// [ ] Botones/Opciones para filtrar por status y por personaje existente o agregado por nosotros
// [ ] Boton/Opcion para ordenar tanto ascendentemente como descendentemente los personajes por orden alfabético
// [ ] Paginado para ir buscando y mostrando los siguientes personajes

// {allCharacters?.map((r) => {
//     return (
//             <fragment>
//                 <Card name={r.name} nickname={r.nickname} image={r.img} key={r.id} />
//             </fragment>
//     );
// })}
import axios from 'axios';

//me trae todos los personajes
export function getCharacters(){
    return async function(dispatch){
        var info= await axios.get("http://localhost:3001/characters",{
        });
        return dispatch({
            type: "GET_CHARACTERS",
            payload: info.data
        })
    }
}
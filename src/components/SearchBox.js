import React, {useState} from 'react';
import {TextInput} from 'react-materialize';

export default (props)=>{
    const [término, setTérmino] = useState('');

    const handleTérminoChange=(event)=>{
        setTérmino(event.target.value);
        props.handleSearch(event.target.value);
    }

    return(
        <TextInput
            id={props.id}
            placeholder='Buscar'
            style={props.style}
            value={término}
            onChange={handleTérminoChange}
        />
    )
}
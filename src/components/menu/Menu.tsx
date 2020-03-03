import React, { useContext } from 'react'
import {MainContext, MainProvider} from '../../Context/MainContext'

const myStyle = {
    color: 'red',
    background: 'blue',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    fontSize: '60px'
}

interface MenuProps {
    status: boolean
    counter: number
}

export default () => {
    const context = useContext(MainContext)
    return (
        <div className='Menu' style={myStyle}>
            <i className="fas fa-home" />
            <h1>{context?.counter}</h1>
            <button onClick={() => {context?.setCounter(2)}}>Hyde Botón</button>
        </div>
    )
}
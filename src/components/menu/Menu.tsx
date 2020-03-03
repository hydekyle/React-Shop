import React, { useContext } from 'react'
import {MainContext, ContextConsumer} from '../../Context/MainContext'

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
            <h2>{context?.counter}</h2>
        </div>
    )
}
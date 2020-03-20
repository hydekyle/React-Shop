import React, { useState, useEffect } from 'react'
import { get_advice } from '../../controller/Api'

interface ItemProps {
    name: string
    description: string
    img: string
}

export default () => {
    const [props, setProps] = useState<ItemProps>({
        name: "Unloaded",
        description: "",
        img: ""
    })

    useEffect(() => {
        if (props.name === "Unloaded") {
            get_advice("HydeTest")
                .then(val => {
                    setProps({
                        name: "Fetcheado",
                        description: val,
                        img: "https://www.thesun.co.uk/wp-content/uploads/2018/11/cat-2.png"
                    })
                })
        }
    })

    return (
        <div style={myStyleBody}>
                <h1 style={myStyleName}>{props.name}</h1>
                <img src={props.img} alt="" width="180px" height="180px" style={myStyleImg}/>
                <h2 style={myStyleDesc}>{props.description}</h2>
            </div>
    )
}

// Estilos

const myStyleBody = {
    display: 'flex',
    border: '2px solid black',
    width: '200px',
    flexDirection: "column",
    backgroundColor: 'white',
    borderRadius: '12px',
    marginTop: '10px',
    marginBottom: '10px',
    marginLeft: '10px',
    marginRight: '10px'
} as React.CSSProperties

const myStyleName = {
    color: 'black',
    margin: 'auto',
    marginBottom: '20px'
} as React.CSSProperties

const myStyleImg = {
    margin: 'auto'
} as React.CSSProperties

const myStyleDesc = {
    color: 'grey',
    margin: 'auto',
    marginBottom: '10px'
} as React.CSSProperties

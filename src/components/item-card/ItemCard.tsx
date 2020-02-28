import React, { useState, useEffect } from 'react'
import { get_user } from '../../controller/Api'

interface ItemProps {
    name: string
    description: string
    img: string
}

function useMyHook() {
    const [props, setProps] = useState<ItemProps>({
        name: "Unloaded",
        description: "",
        img: ""
    })

    useEffect(() => {
        if (props.name === "Unloaded") {
            get_user("HydeTest")
                .then(val => {
                    setProps({
                        name: "Fetcheado",
                        description: val.slip.advice,
                        img: "https://www.thesun.co.uk/wp-content/uploads/2018/11/cat-2.png"
                    })
                })
        }
    })

    return props
}

export default function HydeFunction() {
    const myHook = useMyHook();

    return (
        <div style={myStyleBody}>
                <h1 style={myStyleName}>{myHook.name}</h1>
                <img src={myHook.img} alt="" width="180px" height="180px" style={myStyleImg}/>
                <h2 style={myStyleDesc}>{myHook.description}</h2>
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

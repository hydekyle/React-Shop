import React, { useState } from 'react'
import './GameMoons.css'

interface Props {
    rows: number
    columns: number
    pointer: number
}

export default () => {

    const [props, setProps] = useState<Props>({
        rows: 3,
        columns: 3,
        pointer: 0
    })

    const moons = ["🌕", "🌖", "🌗", "🌘", "🌑", "🌒", "🌓", "🌔"]

    const Rotate = (wheelEvent: React.WheelEvent) => {
        if (wheelEvent.deltaY < 0) RotateLeft()
        else RotateRight()
    }

    const RotateRight = () => {
        setProps({
            pointer: props.pointer < moons.length - 1 ? props.pointer + 1 : 0,
            rows: props.rows,
            columns: props.columns
        })
    }

    const RotateLeft = () => {
        setProps({
            pointer: props.pointer > 0 ? props.pointer - 1 : moons.length - 1,
            rows: props.rows,
            columns: props.columns
        })
    }

    return (
        <div>
            <div className='box'>
                {moons.map((index) => {
                    return <div
                        key={index}
                        className="moon-picker"
                        onWheel={(wheelEvent) => Rotate(wheelEvent)}
                    >{moons[props.pointer]}</div>
                })}
            </div>
        </div>
    )
}
import React, { useState } from 'react'
import './GameMoons.css'
import * as _ from 'lodash'


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
    const minRows = 1, minColumns = 1
    const maxRows = 100, maxColumns = 100

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

    const ChangeRows = value => {
        setProps({
            columns: props.columns,
            pointer: props.pointer,
            rows: _.clamp(props.rows + value, minRows, maxRows)
        })
    }

    const ChangeColumns = value => {
        setProps({
            rows: props.rows,
            pointer: props.pointer,
            columns: _.clamp(props.columns + value, minColumns, maxColumns)
        })
    }

    const Canta = value => {
        console.log(value)
    }

    return (
        <div>
            <div className='box'>
                <button onClick={() => ChangeRows(-1)}>Row-</button>
                <button onClick={() => ChangeRows(1)}>Row+</button>
                <button onClick={() => ChangeColumns(-1)}>Column-</button>
                <button onClick={() => ChangeColumns(1)}>Column+</button>
            </div>
            <div className='box'>
                {Array.from(Array(props.rows), (e, rowNumber) => {
                    return <div
                        className='moon-picker'
                        key={rowNumber}
                        onWheel={(wheelEvent) => Rotate(wheelEvent)}>

                        {
                            Array.from(Array(props.columns), (e, columnNumber) => {
                                const myKey = `${rowNumber}|${columnNumber}`
                                return <div
                                    key={myKey}
                                    onClick={() => { Canta(myKey) }}
                                >{moons[props.pointer]}</div>
                            })
                        }

                    </div>
                })}
            </div>
        </div>
    )
}
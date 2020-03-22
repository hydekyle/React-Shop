import React, { useState } from 'react'
import './GameMoons.css'
import _ from 'lodash'

interface Props {
    rows: number
    columns: number
    pointer: number
    map: Map<String, number>
}

export default () => {

    const moons = ["🌕", "🌖", "🌗", "🌘", "🌑", "🌒", "🌓", "🌔"]
    const minRows = 1, minColumns = 1
    const maxRows = 100, maxColumns = 100

    const [props, setProps] = useState<Props>({
        rows: 3,
        columns: 3,
        pointer: 0,
        map: new Map()
    })

    const SetRows = (value: number) => {
        setProps({
            ...props,
            rows: _.clamp(props.rows + value, minRows, maxRows)
        })
    }

    const SetColumns = (value: number) => {
        setProps({
            ...props,
            columns: _.clamp(props.columns + value, minColumns, maxColumns)
        })
    }

    const RotateMoon = (moonID: string, wheelEvent: React.WheelEvent) => {
        let newMoonValue = props.map[moonID]
        if (wheelEvent.deltaY < 0) {
            newMoonValue = newMoonValue > 0 ? newMoonValue - 1 : moons.length - 1
        }
        else {
            newMoonValue = newMoonValue < moons.length - 1 ? newMoonValue + 1 : 0
        }
        SetMoonValue(moonID, newMoonValue)
    }

    const SetMoonValue = (ID: string, newValue: number) => {
        let newMap = props.map
        newMap[ID] = newValue
        setProps({
            ...props,
            map: newMap
        })
    }

    return (
        <div>
            <div className='box'>
                <button onClick={() => SetRows(-1)}>Row-</button>
                <button onClick={() => SetRows(1)}>Row+</button>
                <button onClick={() => SetColumns(-1)}>Column-</button>
                <button onClick={() => SetColumns(1)}>Column+</button>
            </div>
            <div className='box'>
                {Array.from(Array(props.rows), (e, rowNumber) => {
                    return <div
                        className='moon-picker'
                        key={rowNumber}>

                        {
                            Array.from(Array(props.columns), (e, columnNumber) => {
                                const myKey = `${rowNumber}|${columnNumber}`
                                return (
                                    <div
                                        key={myKey}
                                        onWheel={wheelEvent => RotateMoon(myKey, wheelEvent)}>
                                        {moons[props.map[myKey] === undefined ? 0 : props.map[myKey]]}
                                    </div>
                                )
                            })
                        }

                    </div>
                })}
            </div>
        </div>
    )
}
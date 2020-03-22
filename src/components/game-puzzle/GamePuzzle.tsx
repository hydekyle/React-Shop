import React, { useState, useEffect } from 'react'
import './GamePuzzle.css'
import _ from 'lodash'

interface Props {
    rows: number
    columns: number
    map: Map<String, boolean>
}

export default GamePuzzle => {

    const [props, setProps] = useState<Props>({
        rows: 3,
        columns: 3,
        map: new Map()
    })

    useEffect(() => {
        GenerateRandomPuzzle()
    }, [])

    const GenerateRandomPuzzle = () => {
        let newMap = props.map
        for (var x = 0; x < props.rows; x++) {
            for (var y = 0; y < props.columns; y++) {
                newMap[`${x}|${y}`] = _.random(0, 1)
            }
        }
        setProps({
            ...props,
            map: newMap
        })
    }

    const Clicka = id => {

        let x = parseInt(id.split("|")[0])
        let y = parseInt(id.split("|")[1])
        let newMap = props.map
        newMap[id] = !newMap[id] //Change the clicked one and the neighbours
        if (x - 1 >= 0) newMap[`${x - 1}|${y}`] = !newMap[`${x - 1}|${y}`]
        if (x + 1 <= props.columns - 1) newMap[`${x + 1}|${y}`] = !newMap[`${x + 1}|${y}`]
        if (y - 1 >= 0) newMap[`${x}|${y - 1}`] = !newMap[`${x}|${y - 1}`]
        if (y + 1 <= props.rows - 1) newMap[`${x}|${y + 1}`] = !newMap[`${x}|${y + 1}`]
        setProps({
            ...props,
            map: newMap
        })
    }

    return (
        <div className='box'>
            {Array.from(Array(props.rows), (e, x) => {
                return <div key={x}>
                    {
                        Array.from(Array(props.columns), (e, y) => {
                            const myKey = `${x}|${y}`
                            const myValue = props.map[myKey]
                            return (
                                <div
                                    key={myKey}
                                    onClick={() => Clicka(myKey)}
                                    className={myValue ? 'puzzle-button-on' : 'puzzle-button-off'}>
                                </div>
                            )
                        })
                    }
                </div>
            })}
        </div>
    )
}


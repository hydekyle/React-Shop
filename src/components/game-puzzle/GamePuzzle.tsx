import React, { useState, useEffect } from 'react'
import _ from 'lodash'

interface Props {
    rows: number
    columns: number
    map: Map<String, number>
}

export default GamePuzzle => {

    const [props, setProps] = useState<Props>({
        rows: 3,
        columns: 3,
        map: new Map()
    })

    useEffect(() => {
        GenerateRandomPuzzle()
        console.log(props.map)
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

    return (
        <div>
            {Array.from(Array(props.rows), (e, x) => {
                return <div key={x}>
                    {
                        Array.from(Array(props.columns), (e, y) => {
                            let myKey = `${x}|${y}`
                            return <div key={myKey}>{props.map[myKey]}</div>
                        })
                    }
                </div>

            })}
        </div>
    )
}


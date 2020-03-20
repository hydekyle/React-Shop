import React, { useState, useMemo } from 'react'

export interface ContextInterface {
    counter: number,
    name: string,
    setCounter: Function,
    resetCounter: Function
}

export const MainContext = React.createContext<ContextInterface | undefined>(undefined)

export function MainProvider(props) {
    const [counter, setCounter] = useState(0)

    const resetCounter = () => {
        console.log("orale")
        setCounter(0)
    }
    const providerValues = useMemo(() => {
        return ({
            setCounter,
            counter,
            resetCounter
        })
    }, [counter])
    return <MainContext.Provider value={providerValues} {...props} />
}
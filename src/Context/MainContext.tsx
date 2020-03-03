import React, { useState, useMemo } from 'react'

export interface ContextInterface {
    counter: number,
    name: string,
    setCounter: Function
}

export const MainContext = React.createContext<ContextInterface | undefined>(undefined)

export const ContextConsumer = MainContext.Consumer

export function MainProvider(props) {
    const [counter, setCounter] = useState(0)
    const value = useMemo(() => {
        return ({
            setCounter,
            counter
        })
    }, [counter])
    return <MainContext.Provider value={value} {...props} />
}
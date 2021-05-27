import React, { useContext } from 'react'
import { Button } from 'reactstrap'
import { valuesIn } from 'lodash'

enum buttonColor {
    primary = "primary",
    secondary = "secondary"
}

interface buttonProps {
    label: string
    color: buttonColor | string
    link: string
}

export default (props: buttonProps) => {
    return (
        <div className="btn-main">
            <Button
                color={props.color}
                size="lg"
                onClick={() => {
                    var win = window.open(props.link, "_blank")
                    win?.focus()
                }}
            >{props.label}</Button>
        </div>
    )
}
import React, { useContext } from 'react'
import { Button } from 'reactstrap'

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
                onClick={() => window.location.href = props.link}
            >{props.label}</Button>
        </div>
    )
}
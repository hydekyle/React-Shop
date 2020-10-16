import React, { useState, useEffect } from 'react'
import Unity, { UnityContext } from "react-unity-webgl";

interface Props {
    gameTitle: string
}

export default (props: Props) => {

    const unityContext = new UnityContext({
        loaderUrl: "build/Invaders.loader.js",
        dataUrl: "build/Invaders.data",
        frameworkUrl: "build/Invaders.framework.js",
        codeUrl: "build/Invaders.wasm",
    });

    return (
        <div>
            <Unity unityContext={unityContext}></Unity>
        </div>
    )
}
import React from 'react'

export default function Tile({image}) {
    return (
        <div className="comp-tile">
            <img src={image[0].value} alt="tile"/>
        </div>
    )
}

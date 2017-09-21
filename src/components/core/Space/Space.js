import React from 'react'
import spaces from './spaceVals.sass'

const capitalize = str => {
    return str.replace(str[0], str[0].toUpperCase())
}

const Space = props => {
    const styles = {
        marginTop: '0',
        marginRight: '0',
        marginBottom: '0',
        marginLeft: '0'
    }
    let side

    if(props.all) for(side in styles) styles[side] = spaces[props.all] 
 
    if(props.horizontal) { 
        for(side of ['Right', 'Left']) {
            styles['margin' + side] = spaces[props.horizontal]
        }
    }

    if(props.vertical) {
        for(side of ['Top', 'Bottom']) {
            styles['margin' + side] = spaces[props.vertical] 
        }
    }

    for(side of ['top', 'right', 'bottom', 'left']) {
        if(props[side]) {
            styles['margin' + capitalize(side)] = spaces[props[side]]
        }
    } 

    return (
        <div style={styles} className={props.className}> 
            {props.children} 
        </div>
    )
}

export default Space
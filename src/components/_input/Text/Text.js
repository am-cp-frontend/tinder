import React from 'react'
import PropTypes from 'prop-types'

import styles from './Text.sass'

const propTypes = {
    id: PropTypes.string.isRequired,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func
}

const defaultProps = {
    onChange: () => {}
}


const composeKeyHandler = reactions => reactions ? 
    e => {
        reactions.forEach(reaction => {
            if(e.which === reaction.key) reaction.cb(e)
        })
    } 
    : () => {}

const TextInput = props => {
    const type = props.type || 'text'
    const classes = props.className ? styles.host + ' ' + props.className : styles.host 
    
    return (
        <div className={classes}>
            <label className={styles.label} htmlFor={props.id}> 
                {props.children}
            </label>

            <div className={styles.inputWrapper}>
                <input type={type} 
                       id={props.id}
                       className={styles.input}
                       defaultValue={props.defaultValue}
                       value={props.value}
                       onChange={props.onChange}
                       onKeyDown={composeKeyHandler(props.onKeyUp)}
                       placeholder={props.placeholder}
                       autoFocus={props.autoFocus} />
                <div className={styles.border} />
            </div>
        </div>
    )
}

TextInput.propTypes = propTypes

export default TextInput
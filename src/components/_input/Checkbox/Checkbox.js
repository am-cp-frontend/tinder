import React from 'react'
import PropTypes from 'prop-types'

import styles from './Checkbox.sass'

const propTypes = {
    id: PropTypes.string.isRequired,
    checked: PropTypes.bool,
    onChange: PropTypes.func
}

const defaultProps = {
    name: '0',
    tabIndex: '0',
    onChange: e => console.warn('No onchange handler for checkbox')
}

const handleKeyUp = e => {
    if(e.which === 13) e.target.click()
}

const Checkbox = props => (
    <div className={styles.host}>
        <input type='checkbox' 
               name={props.group}
               tabIndex={props.tabIndex}
               className={styles.checkbox} 
               
               id={props.id} 
               checked={props.checked}
               onChange={props.onChange}
               onKeyUp={handleKeyUp}
               autoFocus={props.autoFocus} /> 
        
        <label className={styles.label} htmlFor={props.id}> 
            <div> {props.children} </div>
        </label>
    </div>
)

Checkbox.propTypes = propTypes
Checkbox.defaultProps = defaultProps

export default Checkbox
import React from 'react'
import PropTypes from 'prop-types'

import styles from './Checkbox.sass'

const propTypes = {
    id: PropTypes.string.isRequired,
    checked: PropTypes.bool
}

const Checkbox = props => (
    <div className={styles.host}>
        <input type='checkbox' 
               tabIndex='0'
               className={styles.checkbox} 
               
               id={props.id} 
               checked={props.checked} /> 
        
        <label className={styles.label} htmlFor={props.id}> 
            <div> {props.children} </div>
        </label>
    </div>
)

Checkbox.propTypes = propTypes

export default Checkbox
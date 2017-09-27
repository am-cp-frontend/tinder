import React from 'react'
import PropTypes from 'prop-types'

import styles from './Checkbox.sass'

const Checkbox = props => (
    <div className={styles.host}>
        <input type='checkbox' className={styles.checkbox} id={props.id} checked={props.checked} tabIndex='0' />
        
        <label className={styles.label} htmlFor={props.id}> 
            <div> {props.children} </div>
        </label>
    </div>
)

Checkbox.propTypes = {
    id: PropTypes.string.isRequired,
    checked: PropTypes.bool
}

export default Checkbox
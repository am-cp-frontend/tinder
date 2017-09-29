import React from 'react'
import styles from './ViewBox.sass'

const ViewBox = props => <div className={styles.viewBox}> {props.children} </div>

export default ViewBox
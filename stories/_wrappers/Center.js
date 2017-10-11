import React from 'react'
import styles from './Center.sass'

import coreStyles from '@src/index.sass'

const CenterWrapper = props => (
    <div className={styles.CenterWrapper + ' ' + coreStyles.app}>
        <div className={styles.content}>
            {props.children}
        </div>
    </div>
)

module.exports = CenterWrapper
import React from 'react'
import { Link } from 'mobx-router'
import { inject } from 'mobx-react'
import cls from 'classnames'

import routes from '@src/store/routes'

import styles from './Link.sass'

const defaultProps = {
    type: 'inline'
}

const DumbLink = props => (
    <Link view        = {routes[props.route]} 
          store       = {props.store} 
          params      = {props.params}
          queryParams = {props.query}
          className   = {cls({
              [styles.block]: props.type === 'block'
          })}> 
        {props.children}
    </Link>
)

DumbLink.defaultProps = defaultProps

const AppLink = inject('store')(DumbLink)

export default AppLink
import React from 'react'
import PropTypes from 'prop-types'

import './Header.sass'

const Header = props => React.createElement('h' + props.level, { children: props.children })

Header.propTypes = {
    level: PropTypes.number.isRequired
}

export default Header
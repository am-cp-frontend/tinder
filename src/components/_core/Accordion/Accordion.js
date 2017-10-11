import React from 'react'
import PropTypes from 'prop-types'

import Space from '@components/_core/Space~'
import Button from '@components/_input/Button~'

import styles from './Accordion.sass'

const propTypes = {
    expanded: PropTypes.bool,
    toExpandBtn: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.string
    ]),
    toCollapseBtn: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.string
    ]),
    togglePos: PropTypes.oneOf(['before', 'after'])
}

const defaultProps = {
    togglePos: 'before',
    toExpandBtn: 'Показать',
    toCollapseBtn: 'Скрыть',
    expanded: false
}

class Accordion extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isOpen: props.expanded
        }

        this.toogle = this.toogle.bind(this)
    }

    toogle() {
        this.setState({isOpen: !this.state.isOpen})
    }

    componentWillReceiveProps(props) {
        this.setState({isOpen: props.expanded})
    }

    render() {
        const toogleBtnEl = (
            <Button onClick={this.toogle} className={styles.button}>
                {this.state.isOpen ? 
                    this.props.toCollapseBtn : this.props.toExpandBtn}
            </Button>
        )

        return (
            <div>
                {this.props.togglePos === 'before' ? toogleBtnEl : null}
                {this.state.isOpen ? this.props.children : null} 
                {this.props.togglePos === 'after' ? toogleBtnEl : null}
            </div>
        )
    }
}

Accordion.propTypes = propTypes
Accordion.defaultProps = defaultProps

export default Accordion
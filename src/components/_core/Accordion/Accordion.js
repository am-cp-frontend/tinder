import React from 'react'

import Space from '@components/_core/Space~'
import Button from '@components/_input/Button~'

import styles from './Accordion.sass'

class Accordion extends React.Component {
    constructor(props) {
        super(props)
        this.togglePos = props.togglePos || 'before'

        this.toOpenBtn = props.toOpenBtn || 'Показать'
        this.toCloseBtn = props.toCloseBtn || 'Скрыть'

        this.state = {
            isOpen: props.isOpen || false
        }
        this.toogle = this.toogle.bind(this)
    }

    toogle() {
        console.log('toogled')
        this.setState({isOpen: !this.state.isOpen})
    }

    componentWillReceiveProps(props) {
        this.setState({isOpen: props.isOpen})
    }

    render() {
        const toogleBtnEl = (
            <Button onClick={this.toogle} className={styles.button}>
                {this.state.isOpen ? this.toCloseBtn : this.toOpenBtn}
            </Button>
        )

        return (
            <div>
                {this.togglePos === 'before' ? toogleBtnEl : null}
                {this.state.isOpen ? this.props.children : null} 
                {this.togglePos === 'after' ? toogleBtnEl : null}
            </div>
        )
    }
}

export default Accordion
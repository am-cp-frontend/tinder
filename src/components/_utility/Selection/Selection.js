import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { observer } from 'mobx-react'
import { observable } from 'mobx'

import styles from './Selection.sass'

const propTypes = {
    options: PropTypes.arrayOf(PropTypes.string),
    value: PropTypes.string,
    show: PropTypes.bool,
    focus: PropTypes.bool,
    onChange: PropTypes.func
} 

const defaultProps = {
    options: [],
    onChange: () => {},
    focus: false,
    show: false
}

const Option = props => (
    <div className={classNames(styles.option, {
            [styles.optionFocused]: props.focused,
            [styles.optionSelected]: props.selected
         })}
        onMouseDown={props.onClick}
        onMouseOver={props.onMouseOver}>
        {props.value}
    </div>
)

@observer
class Selection extends React.Component {
    @observable focusIdx = 0
    constructor(props) {
        super(props)
        this.handleKey = this.handleKey.bind(this)
    }

    handleKey(event) {
        if(this.props.focus) {
            if(event.which === 13)
                this.props.onChange(this.props.options[this.focusIdx])
            if(event.which === 40 && this.focusIdx < this.props.options.length)
                 this.focusIdx+=1
            if(event.which === 38 && this.focusIdx > 0) 
                this.focusIdx-=1
        }
    }

    handleClick(value) {
        return event => {
            if(event.which === 1) this.props.onChange(value)
        }
    }

    handleHover(idx) {
        return event => this.focusIdx = idx
        
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKey)
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKey)
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.options !== nextProps.options)
            this.focusIdx = 0
    }
    
    render() {
        const optionEls = this.props.options.map((value, idx) => (
            <Option focused={idx === this.focusIdx} 
                    selected={value === this.props.value}
                    value={value}
                    key={value}
                    onMouseOver={this.handleHover(idx)}
                    onClick={this.handleClick(value)} />
        ))

        return (
            <div className={classNames(styles.host, {
                [this.props.className]: this.props.className
            })}>
                {(this.props.show || this.props.focus) && optionEls.length
                    ? <div className={styles.selection}> {optionEls} </div>
                    : null
                }
            </div>
        )
    }
}

Selection.propTypes = propTypes
Selection.defaultProps = defaultProps 

export default Selection
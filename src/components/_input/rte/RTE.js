import React from 'react'
import PropTypes from 'prop-types'

import styles from './RTE.sass'

const propTypes = {
    id: PropTypes.string.isRequired,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func
}

const defaultProps = {
    onChange: () => {}
}

const composeKeyHandler = reactions => reactions ? 
    e => {
        reactions.forEach(reaction => {
            if(e.which === reaction.key) reaction.cb(e)
        })
    } 
    : () => {}

class RichEditor extends React.Component {
    constructor(props) {
        super(props)
        this.resizeToContent = this.resizeToContent.bind(this)
    }

    resizeToContent() {
        this.editor.style.height = 0
        this.editor.style.height = this.editor.scrollHeight + 'px'
    }

    componentDidMount() {
        this.resizeToContent()

        window.addEventListener('resize', this.resizeToContent)
        this.editor.addEventListener('input', this.resizeToContent)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resizeToContent)
    }

    render() {
        const props = this.props
        const type = props.type || 'text'
        const classes = props.className ? styles.host + ' ' + props.className : styles.host 
        
        return (
            <div className={classes}>
                <label className={styles.label} htmlFor={props.id}> 
                    {props.children}
                </label>
    
                <div className={styles.inputWrapper}>
                    <textarea ref={el => this.editor = el}
                              className={styles.input}
                              defaultValue={props.defaultValue}
                              onChange={props.onChange}
                              onKeyDown={composeKeyHandler(props.onKeyUp)}
                              placeholder={props.placeholder}
                              autoFocus={props.autoFocus} />
                    <div className={styles.border} />
                </div>
            </div>
        )
    }
    
}


RichEditor.propTypes = propTypes

export default RichEditor
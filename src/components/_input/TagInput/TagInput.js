import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import TagList from '@components/_core/TagList~'
import Icon from '@components/_utility/Icon~'
import CloseGlyph from '@icons/close.svg'

import { observer } from 'mobx-react'
import { observable } from 'mobx'

import styles from './TagInput.sass'

const removeTagAction = tags => ({
    type: 'icon',
    eval: tagVal => {
        tags.splice(tags.indexOf(tagVal), 1)
    },
    children: <Icon glyph={CloseGlyph} />
})

@observer
class TagInput extends React.Component {
    constructor(props) {
        super(props)

        this.tags = this.props.tags

        this.state = {input: '', focused: false}
        
        this.focusInput = this.focusInput.bind(this)
        this.handleInput = this.handleInput.bind(this)
        this.handleBlur = this.handleBlur.bind(this)
        this.addTag = this.addTag.bind(this)
    }

    focusInput() {
        this.textInput.focus()
    }
    
    reset() {
        this.textInput.value = ''
        this.setState({input: ''})
    }

    handleInput(e) {
        if(e.which === 13) {
            this.addTag(this.state.input)
        } else {
            if(e.which === 8 && this.state.input === '') this.tags.pop()
            this.setState({input: this.textInput.value})
        }        
    }

    handleBlur() {
        if(this.state.input) this.  addTag(this.state.input)
        this.setState({focused: false})
    }

    addTag(tagVal) {
        if(tagVal) this.tags.push(tagVal)
        this.reset()
    }

    render() {
        const hostClasses = classNames(styles.host, {
            [this.props.className]: this.props.className
        })

        const borderClasses = classNames(styles.border, {
            [styles.borderFocused]: this.state.focused
        }) 
        
        const shouldRenderPlaceholder = this.tags.length === 0 && this.state.input.length === 0
        
        return (
            <div className={hostClasses} onClick={this.focusInput}>
                <label className={styles.label}> 
                    <div> {this.props.children} </div>
                </label>

                <div className={styles.input}>
                    {/* Placeholder */}
                    {shouldRenderPlaceholder ? 
                        (
                            <div className={styles.placeholder}> 
                                {this.props.placeholder}
                            </div>
                        ) : null
                    }
                    
                    {/* View */}
                    <TagList tags={this.tags} 
                             tagProps={this.props.tagProps} 
                             tagActions={[removeTagAction(this.tags)]}
                             className={styles.tagList}
                             childClassName={styles.realInputHost}
                    >
                        <input className={styles.realInput}
                            onKeyUp={this.handleInput} 
                            onFocus={e => this.setState({focused: true})}
                            onBlur={this.handleBlur}
                            ref={el => this.textInput = el} />
                    </TagList>
                    <div className={borderClasses} />
                </div>
            </div>
        )
    }
}

TagInput.propTypes = {
    placeholder: PropTypes.string
}


TagInput.defaultProps = {
    tags: observable([])
}

export default TagInput
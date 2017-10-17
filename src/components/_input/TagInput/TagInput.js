import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { observer } from 'mobx-react'
import { observable } from 'mobx'

import TagList from '@components/_core/TagList~'
import Selection from '@components/_utility/Selection~'
import Icon from '@components/_utility/Icon~'
import CloseGlyph from '@icons/close.svg'

import styles from './TagInput.sass'

const removeTagAction = tags => ({
    type: 'icon',
    eval: tagVal => {
        tags.splice(tags.indexOf(tagVal), 1)
    },
    children: <Icon glyph={CloseGlyph} />
})

const possibleTags = ['FieldSome', 'b', 'c', 'd']

@observer
class TagInput extends React.Component {
    @observable inputValue = ''
    @observable focused = false
    constructor(props) {
        super(props)

        this.tags = this.props.tags    
        this.focusInput = this.focusInput.bind(this)
        this.handleInput = this.handleInput.bind(this)
        this.handleBlur = this.handleBlur.bind(this)
        this.addTag = this.addTag.bind(this)
        this.handleAutocomplete = this.handleAutocomplete.bind(this)
    }

    focusInput() {
        this.textInput.focus()
    }
    
    reset() {
        this.textInput.value = ''
        this.inputValue = ''
    }

    handleInput(e) {
        if(e.which === 13) {
            this.addTag(this.inputValue)
        } else {
            if(e.which === 8 && this.inputValue === '') this.tags.pop()
            this.inputValue = this.textInput.value
        }        
    }

    handleBlur(event) {
        if(this.inputValue) this.addTag(this.inputValue)
        this.focused = false
    }

    handleAutocomplete(value) {
        this.inputValue = value
        setTimeout(() => this.focusInput(), 0)
    }

    addTag(tagVal) {
        if(tagVal) this.tags.push(tagVal)
        this.reset()
    }

    componentWillReceiveProps(nextProps) {
        this.tags = nextProps.tags
    }

    render() {
        const hostClasses = classNames(styles.host, {
            [this.props.className]: this.props.className
        })

        const borderClasses = classNames(styles.border, {
            [styles.borderFocused]: this.focused
        }) 
        
        const shouldRenderPlaceholder = this.tags.length === 0 && this.inputValue === ''
        
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
                            onFocus={e => this.focused = true}
                            onBlur={this.handleBlur}
                            ref={el => this.textInput = el}
                            autoFocus={this.props.autoFocus} />
                    </TagList>
                    <div className={borderClasses} />
                    <Selection className={styles.autocomplete}
                               focus={this.focused}
                               onChange={this.handleAutocomplete}
                               options={possibleTags.slice(this.tags.length)} />
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
import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'

import Space from '@components/_core/Space~'
import Tag from '@components/_core/Tag~'

import styles from './TagList.sass' 


const propTypes = {
    tags: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.objectOf(PropTypes.string)
    ]).isRequired,
    actions: PropTypes.array,
    tagProps: PropTypes.object
}

const defaultProps = {
    tags: [],
    actions: [],
    tagProps: {}
}

const isRow = (tagListRef) => {
    if(tagListRef.children.length === 0) return true
    let isSingleRow = true

    const topShift = tagListRef.children[0].getBoundingClientRect().top
    const childrenArr = [...tagListRef.children]
    
    childrenArr.forEach(el => { 
        if(el.getBoundingClientRect().top !== topShift) isSingleRow = false
    });

    return isSingleRow
}

const makeTag = props => (
    <Tag {...props.tagProps}
        withDivider={props.idx !== 0 && !props.spacing}
        actions={props.tagActions}> 
        {props.tagValue}
    </Tag>
)

const ListItem = props => (
    <Space bottom={props.spacing ? 's' : 0} 
           right={props.spacing && props.last !== 0 ? 's' : 0}
           className={styles.listItem + ' ' + props.className}>
        {props.children ? props.children : makeTag(props)}
    </Space>
)

@observer
class TagList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {isRow: true}

        this.responsiveChange = this.responsiveChange.bind(this)
    }

    responsiveChange() {
        const isSingleRow = isRow(this.base)
        if(this.state.isRow !== isSingleRow) this.setState({isRow: isSingleRow})
    }

    componentDidUpdate() {
        this.responsiveChange()
    }

    componentDidMount() {
        this.responsiveChange()
        window.addEventListener('resize', this.responsiveChange)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.responsiveChange)
    }

    render() {
        const classes = classNames(styles.tagList, {
            [styles.multiline]: ! this.state.isRow,
            [this.props.className]: this.props.className
        })

        return (
            <div className={classes} ref={el => this.base = el}>
                {this.props.tags.map((tag, i) => (
                    <ListItem key={i}
                              idx={i}
                              tagProps={this.props.tagProps}
                              spacing={ ! this.state.isRow}
                              tagActions={this.props.tagActions}
                              tagValue={tag}
                              last={this.props.tags.length === i+1 && !this.props.children} />)
                )}
                {this.props.children ? (
                    <ListItem spacing={ ! this.state.isRow}
                              className={this.props.childClassName}
                              last={true}> 
                        {this.props.children}
                    </ListItem>) : null
                }
            </div>
        )   
    }
}

TagList.propTypes = propTypes
TagList.defaultProps = defaultProps

export default TagList
import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import Space from '@components/_core/Space~'
import Tag from '@components/_core/Tag~'

import styles from './TagList.sass' 


const propTypes = {
    tags: PropTypes.array,
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

const ListItem = props => (
    <Space bottom={props.spacing ? 's' : 0} right={props.spacing ? 's' : 0}>
        <Tag {...props.tagProps}
            withDivider={props.idx !== 0 && !props.spacing}> 
            {props.children} 
        </Tag>
    </Space>
)

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
            [styles.multiline]: ! this.state.isRow
        })

        return (
            <div className={classes} ref={el => this.base = el}>
                {this.props.tags.map((tag, i) => (
                    <ListItem key={i}
                              idx={i}
                              tagProps={this.props.tagProps}
                              spacing={ ! this.state.isRow}>
                        {tag} 
                    </ListItem>)
                )}         
            </div>
        )   
    }
}

TagList.propTypes = propTypes
TagList.defaultProps = defaultProps

export default TagList
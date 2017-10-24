import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'

import Space from '@components/_core/Space~'

PropTypes.component = PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.instanceOf(React.Component)
])

const propTypes = {
    data: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object
    ]).isRequired,
    item: PropTypes.component,
    getKey: PropTypes.func,

    divider: PropTypes.element
}

let fallbackKey = 0
const defaultProps = {
    data: [],
    getKey: data => fallbackKey++,
    divider: <Space top='m' />
}

const List = observer(props => {
    const items = props.data.map((data, idx) => {
        const key = props.getKey(data, idx)
        return {
            el: React.createElement(props.item, Object.assign(
                    {keyValue: key},
                    data,
                    props.itemProps)
            ),
            key: key
        }
    })
    
    const itemEls = items.reduce((oldVal, item, i) => {
        const addition = []
        if(i !== 0) addition.push(props.divider)
        addition.push(item.el)
        return oldVal.concat(addition)
    }, [])

    return <div className={props.className}> {itemEls} </div>
})

List.propTypes = propTypes
List.defaultProps = defaultProps

export default List
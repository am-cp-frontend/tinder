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

const ListItem = props => (
    <div>
        {props.idx !== 0 ? props.divider : null}
        {props.children}
    </div>
)

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
    
    const itemEls = items.map((item, i) => (
        <ListItem key={item.key} idx={i} divider={props.divider}> 
            {item.el}
        </ListItem>
    ))

    return <div> {itemEls} </div>
})

List.propTypes = propTypes
List.defaultProps = defaultProps

export default List
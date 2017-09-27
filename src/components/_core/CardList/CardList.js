import React from 'react'

import Space from '@components/_core/Space~'

const ListItem = props => (
    <Space className='listItem' 
           top={props.idx == 0 ? '0' : 'm'}>
        {props.children}
    </Space>
)

const CardList = props => {
    const cards_El = props.items.map(
        item => React.createElement(props.card, item)
    )
    
    return (
        <div className='list'>
            {cards_El.map((card, i) => <ListItem key={i} idx={i}> {card} </ListItem>)}         
        </div>
    )   
}

export default CardList
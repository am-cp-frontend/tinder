import React from 'react'
import PropTypes from 'prop-types'

import Button from '@components/_input/Button~'

const actionType = PropTypes.shape({
    type: PropTypes.oneOf(['icon', 'button']).isRequired,
    onClick: PropTypes.func
})

const propTypes = {
    actions: PropTypes.oneOfType([
        PropTypes.arrayOf(actionType),
        PropTypes.objectOf(actionType)
    ]),
    hostData: PropTypes.any
}

const defaultProps = {
    actions: []
}

const ActionComponents = {
    icon: props => (<Button onClick={props.onClick} 
                            spaceless={true}
                            transparent={true}> 
                        {props.children} 
                    </Button>),
    button: props => <Button onClick={props.onClick}> {props.children} </Button>
}

const ActionBox = props => {
    const actions = props.actions.map(action => ({
        type: action.type,
        children: action.children,
        onClick: event => action.eval(props.hostData, event)
    }))

    return (
        <div>
            {actions.map((action, i) => 
                React.createElement(
                    ActionComponents[action.type],  {
                    ...action,
                    key: i
                })
            )}
        </div>
    )
}

ActionBox.propTypes = propTypes
ActionBox.defaultProps = defaultProps

export default ActionBox
import React from 'react'
import PropTypes from 'prop-types'

const Quality = ({ color, name }) => {
    return (
        <span className={'badge m-1 bg-' + color}>
            {name}
        </span>)
}
Quality.propTypes = {
    color: PropTypes.string,
    name: PropTypes.string
}

export default Quality

// const Quality = ({ _id, color, name }) => {
//     return (
//         <span className={'badge m-1 bg-' + color} key={_id}>
//             {name}
//         </span>)
// }
// Quality.propTypes = {
//     _id: PropTypes.string.isRequired,
//     color: PropTypes.string,
//     name: PropTypes.string
// }

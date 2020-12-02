import React from 'react'
import './Span.css'




 const Span = ({value, className, onClick}) => {
    return (
        <span 
            className={className} 
            onClick={onClick}
        >{value}</span>
    )
}

export default Span
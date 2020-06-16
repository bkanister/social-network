import React from 'react'

export const Input = ({input, meta, ...props}) => {
    return (
        <>
            <input type={props.type} {...input}/>
            {meta.touched && !meta.valid && <span style={{color: 'red'}}>*{meta.error}</span>}
        </>
    )
}
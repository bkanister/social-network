import React from 'react'

export const Textarea = ({input, meta, ...props}) => {
    return (
        <div>
            <textarea {...input} placeholder={props.placeholder}/>
            {meta.touched && !meta.valid && <span style={{color: 'red'}}>*{meta.error}</span>}
        </div>
    )
}
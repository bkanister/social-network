import React from 'react'

type Props = {
    input: any
    meta: any
    placeholder: string
    touched: boolean
    valid: boolean
    error: any
}

export const Textarea = ({input, meta, ...props}: Props) => {
    return (
        <div>
            <textarea {...input} placeholder={props.placeholder}/>
            {meta.touched && !meta.valid && <span style={{color: 'red'}}>*{meta.error}</span>}
        </div>
    )
}
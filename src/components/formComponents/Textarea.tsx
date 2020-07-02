import React from 'react'
// @ts-ignore
import styled from 'styled-components'

const TextareaStyled = styled.textarea`
    box-sizing: border-box;
    width: 100%;
    height: 110px;
    resize: none;
    border-radius: 7px;
    border: 1px solid #eee;
    font-family: 'Raleway', sans-serif;
    font-size: 15px;
    padding: 20px 20px;
    outline: none;
    letter-spacing: 1.3px;
`

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
            <TextareaStyled {...input} placeholder={props.placeholder}/>
            {meta.touched && !meta.valid && <span style={{color: 'red'}}>*{meta.error}</span>}
        </div>
    )
}
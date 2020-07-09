import React from 'react'
import styled from "styled-components";

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`

const PostFooter = () => {
    return (
        <Footer>
            <p>likes block</p>
            <p>comments</p>
            <p>10 reposts</p>
        </Footer>
    )
}

export default PostFooter
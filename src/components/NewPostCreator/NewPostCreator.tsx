import React, {FC} from 'react'
import {addPostThunkAC} from "../../redux/reducers/posts/postsReducer";
import ImageInputContainer from "../ImageHandler/ImageInputContainer";
import {connect, ConnectedProps} from "react-redux";
import {Field, InjectedFormProps, reduxForm, reset} from "redux-form";
import {Textarea} from "../formComponents/Textarea";
import {minLength, required} from "../../validators";
import styled from 'styled-components'

//styles
const NewPostStyled = styled.div`
    margin: auto;
    background: #fff;
    padding: 20px;
    border-radius: 7px;
    height: auto;
    box-sizing: border-box;
    box-shadow: 0 0 15px -4px rgba(0,0,0,0.16);
    min-width: 400px;
`
const NewPostFooter = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`
const ButtonStyled = styled.button`
    box-shadow:inset 0px 39px 0px -24px #40A798;
    background-color:#40A798;
    border-radius:4px;
    border:1px solid #ffffff;
    display:inline-block;
    cursor:pointer;
    color: white;
    font-size:16px;
    padding:6px 15px;
    text-decoration:none;
    text-shadow:0px 1px 0px #eee;
    
    &:hover {
        background-color: #40A798;
    }
    
    &:active {
        position:relative;
        top:1px;
        outline: none;
    }
`

//validators
const minLength10 = minLength(10)

//types
type Props = PropsFromRedux & {}

const NewPostCreator: FC<Props & InjectedFormProps<{}, PropsFromRedux>> = (props: any) => {
    return (
        <NewPostStyled>
            <form onSubmit={props.handleSubmit}>
                <Field name='newPost' type='text'
                       component={Textarea}
                       placeholder='Write something.'
                       validate={[required, minLength10]}/>
               <NewPostFooter>
                   <ImageInputContainer exactPath={'posts'}/>
                   <ButtonStyled type='submit'>Add post</ButtonStyled>
               </NewPostFooter>
            </form>
        </NewPostStyled>
    )
}


const mapDispatchToProps = (dispatch: any) => {
    return {
        onSubmit: (formData: any) => {
            dispatch(addPostThunkAC(formData.newPost));
            dispatch(reset('newPostCreator'));
        }
    }
}

const NewPostForm = reduxForm<{}, PropsFromRedux>({
    form: 'newPostCreator'
})(NewPostCreator);

const connector =  connect(null, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(NewPostForm)
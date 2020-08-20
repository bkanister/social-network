import React, { FC } from 'react'
import {Field, InjectedFormProps, reduxForm, reset} from "redux-form";
import {Textarea} from "../../components/formComponents/Textarea";
import {connect, ConnectedProps} from "react-redux";
import {sendMessageThunkAC} from "../../redux/reducers/chats/chatReducer";

interface Props {}

const NewMessageCreator: FC<Props & PropsFromRedux & InjectedFormProps<{}, PropsFromRedux>>  = (props) => {
    const handleKeyDown = (e: any, cb: any) => {
        if (e.key === 'Enter' && e.shiftKey === false) {
            e.preventDefault()
            cb()
        }
    }
    return (
        <div>
            <form onSubmit={props.handleSubmit}
                  onKeyDown={(e) => handleKeyDown(e, props.handleSubmit)}>
                <Field name='newMessage' type='text'
                       component={Textarea}
                       placeholder='Write a new message...'/>
                <button type='submit'>send message</button>
            </form>
        </div>
    )
}

const NewMessageForm = reduxForm<{}, PropsFromRedux>({
    form: 'NewMessageForm'
})(NewMessageCreator);

const mapDispatchToProps = (dispatch: any) => {
    return {
        onSubmit: (formData: any) => {
            dispatch(sendMessageThunkAC(formData.newMessage))
            dispatch(reset('NewMessageForm'));
        }
    }
}

const connector = connect(null, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(NewMessageForm)
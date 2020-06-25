import React, {ChangeEvent, FC, useEffect, useState} from 'react'
import {getUserStatusThunkAC, updateStatusThunkAC} from "../../../redux/reducers/profile/profileReducer";
import {connect, ConnectedProps} from "react-redux";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {StoreType} from "../../../redux/reduxStore";

type Props = PropsFromRedux

const Status: FC<Props & InjectedFormProps<{}, Props>> = ({status, onSubmit, getStatus, ...props}: any) => {
    const [editMode, setEditMode] = useState(false)

    useEffect(() => {
        getStatus()
    },[status])

    const sendStatus = (value: string) => {
        setEditMode(false);
        onSubmit(value)
    }

    const handleEnterPress = (e: any) => {
        if (e.key === 'Enter') {
            sendStatus(e.currentTarget.value)
        }
    }

    return (
        !editMode
            ? <p onDoubleClick={() => setEditMode(true)} >{status || 'hi'}</p>
            : <form onSubmit={props.handleSubmit}>
                <Field autoFocus name='status' component='input' type='text'
                       onBlur={(e: any) => sendStatus(e.currentTarget.value)}
                       onKeyPress={(e: any) => handleEnterPress(e)}
                       value={props.initialValues}
                />
            </form>

    )
}

const mapStateToProps = (state: StoreType) => {
    return {
        status: state.profile.userStatus,
        initialValues: {
            status: state.profile.userStatus
        }
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        onSubmit: (value: string) => dispatch(updateStatusThunkAC(value)),
        getStatus: () => dispatch(getUserStatusThunkAC())
    }
}

const StatusForm = reduxForm<{}, Props>({
    form: 'status'
})(Status);

const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

// @ts-ignore
export default connector(StatusForm)
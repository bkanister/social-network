import React, {useEffect, useState} from 'react'
import {getUserStatusThunkAC, updateStatusThunkAC} from "../../../redux/reducers/profileReducer";
import {connect} from "react-redux";
import {Field, reduxForm} from "redux-form";

let Status = props => {
    const [editMode, setEditMode] = useState(false)

    useEffect(() => {
        props.getStatus()
    },[props.status])

    const sendStatus = (value) => {
        setEditMode(false);
        props.onSubmit(value)
    }

    const handleEnterPress = (e) => {
        if (e.key === 'Enter') {
            sendStatus(e.currentTarget.value)
        }
    }

    return (
        !editMode
            ? <p onDoubleClick={() => setEditMode(true)} >{props.status || 'hi'}</p>
            : <form onSubmit={props.handleSubmit}>
                <Field autoFocus name='status' component='input' type='text'
                       onBlur={(e) => sendStatus(e.currentTarget.value)}
                       onKeyPress={e => handleEnterPress(e)}
                       value={props.initialValues}
                />
            </form>

    )
}

const mapStateToProps = state => {
    return {
        status: state.profile.userStatus,
        initialValues: {
            status: state.profile.userStatus
        }
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSubmit: (value) => dispatch(updateStatusThunkAC(value)),
        getStatus: () => dispatch(getUserStatusThunkAC())
    }
}

Status = reduxForm({
    form: 'status'
})(Status);

export default connect(mapStateToProps, mapDispatchToProps)(Status)
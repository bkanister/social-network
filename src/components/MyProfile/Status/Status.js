import React, {useEffect, useState} from 'react'
import {getUserStatusThunkAC, updateStatusThunkAC} from "../../../redux/reducers/profileReducer";
import {connect} from "react-redux";

const Status = props => {
    const [editMode, setEditMode] = useState(false)
    const [status, setStatus] = useState(props.status)

    useEffect(() => {
        props.getStatus()
    },[])

    useEffect(() => {
        setStatus(props.status)
    },[props.status])

    const editModeChangeHandler = (value) => {
        setEditMode(false);
        props.updateStatus(value)
    }

    const handleEnterPress = (e) => {
        if (e.key === 'Enter') {
            editModeChangeHandler(e.currentTarget.value)
        }
    }

    return (
        !editMode
            ? <p onDoubleClick={() => setEditMode(true)} >{props.status}</p>
            : <input autoFocus type="text"
                     value={status}
                     onChange={(e) => setStatus(e.currentTarget.value)}
                     onBlur={(e) => editModeChangeHandler(e.currentTarget.value)}
                     onKeyPress={e => handleEnterPress(e)}
            />
    )
}

const mapStateToProps = state => {
    return {
        status: state.profile.userStatus
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateStatus: (value) => dispatch(updateStatusThunkAC(value)),
        getStatus: () => dispatch(getUserStatusThunkAC())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Status)
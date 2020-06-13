import React, {useEffect, useState} from 'react'
import {getUserStatusThunkAC, updateStatusThunkAC} from "../../../redux/reducers/profileReducer";
import {connect} from "react-redux";

const Status = props => {
    useEffect(() => {
        props.getStatus()
    })
    const [editMode, setEditMode] = useState(false)

    const editModeChangeHandler = (value) => {
        setEditMode(false);
        props.updateStatus(value)
    }
    return (
        !editMode
            ? <p onDoubleClick={() => setEditMode(true)} >{props.status}</p>
            : <input autoFocus type="text" onBlur={(e) => editModeChangeHandler(e.currentTarget.value)}/>
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
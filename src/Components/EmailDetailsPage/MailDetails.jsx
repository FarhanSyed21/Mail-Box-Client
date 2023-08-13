import React from 'react'
import { Button } from 'react-bootstrap';
import {useSelector, useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { mailActions } from '../ReduxStore/mailSlice';
import HTMLReactParser from "html-react-parser";

const MailDetails = () => {
    const Email = useSelector((state) => state.mail.currEmail)
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleClose = () => {
        dispatch(mailActions.RemoveCurrentEmail());
        navigate('/home');
    }
  return (
    <div>
        <Button onClick={handleClose}>Close</Button>
        from: {Email.sender},
        to:{Email.emailHeWantToSend}, subject:{Email.subject},
        description:{HTMLReactParser(Email.desc)}
    </div>
  )
}

export default MailDetails
import React, { Fragment, useEffect, useState } from 'react'
import { Card, Col, Container, Row, Nav, Button } from 'react-bootstrap'
import NavBar from '../Navbar/NavBar';
import './Inbox.css'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { AiOutlineStar } from 'react-icons/ai'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { mailActions } from '../ReduxStore/mailSlice'

const Inbox = () => {

    const [selectedFolder, setSelectedFolder] = useState('inbox');
    const Email = useSelector((state) => state.auth.email).replace(/[@.]/g, "");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const inboxEmails = useSelector((state) => state.mail.InboxEmails)
    
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`https://api-calls-70500-default-rtdb.firebaseio.com/mails/${Email}/inboxEmails.json`,{
                method: "GET"
            })
            let data = await response.json();
            if(data === null){
                return;
            }else{
                const idsArray = Object.keys(data);
                const emailsArray = Object.values(data);
                console.log(idsArray);
                console.log(emailsArray);
                for(let i = 0; i < idsArray.length; i++){
                    dispatch(mailActions.InboxAdd({id: idsArray[i], email: emailsArray[i]}))
                }
            }
            console.log(data);
        }
        fetchData();
    })


    const updateEmail = async (email) => {

        const updatedEmail =  {
            sender: email.sender,
            emailHeWantToSend: email.emailHeWantToSend,
            subject: email.subject,
            desc: email.desc,
            read: true,
        }
        
        if(email.read === false){
            try{
                let response = await fetch(`https://api-calls-70500-default-rtdb.firebaseio.com/mails/${Email}/inboxEmails/${email.id}.json`,{
                    method: "PUT",
                    body : JSON.stringify(updatedEmail),
                    headers:{
                        'Content-Type': "application/json"
                    },
                })
                let data = await response.json();
                if(response.ok){
                    dispatch(mailActions.SetCurrentEmail({email: updatedEmail}))
                    navigate('/details');
                }else{
                    throw new Error(data.error.message)
                }
            }
            catch(error) {
                console.log(error.message);
            }
        }
        dispatch(mailActions.SetCurrentEmail({email: updatedEmail}))
        navigate('/details');
        
    }

    const readedEmail = () => {
        dispatch(mailActions.SetCurrentEmail());
        navigate('/details');
    }

    const handleClick = () => {
        navigate('/compose')
    }
    console.log(inboxEmails);
    return (
        <Fragment>
            <NavBar />
            <Container fluid>
                <Row>
                    <Col md={2} className='folder-list'>
                        <Nav className='flex-column'>
                        <Button className='mb-3' onClick={handleClick}>Compose</Button>
                        <Nav.Link
                            // onClick={() => handleFolderClick('inbox')}
                            className={selectedFolder === 'inbox' ? 'active' : ''}
                        >
                            Inbox
                        </Nav.Link>
                        <Nav.Link
                            // onClick={() => handleFolderClick('sent')}
                            className={selectedFolder === 'sent' ? 'active' : ''}
                        >
                            Sent
                        </Nav.Link>
                        <Nav.Link
                            // onClick={() => handleFolderClick('bin')}
                            className={selectedFolder === 'bin' ? 'active' : ''}
                        >
                            Bin
                        </Nav.Link>
                        </Nav>
                    </Col>
                    <Col md={10} className='mail-view'>
                        <ul>
                            {inboxEmails.map((email) => {
                                if(email.read === false){
                                    return (
                                        <li className='Unread' key={email.id}>
                                            {email.sender}
                                            <h3 className='sub' onClick={() => {updateEmail(email)}}>{email.subject}</h3>
                                        </li>
                                    )
                                }else{
                                    return(
                                        <li className='read' key={email.id}>
                                            {email.sender}
                                            <h3 className='ReadedSub' onClick={() => {updateEmail(email)}}>{email.subject}</h3>
                                        </li>
                                    )
                                }
                            })}
                        </ul>
                    </Col>
                </Row>
            </Container>
            <ToastContainer />
        </Fragment>
    )
}

export default Inbox;
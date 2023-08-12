import React, { Fragment, useState } from 'react'
import { Button, Card, Container, Form } from 'react-bootstrap'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom'
import NavBar from '../Navbar/NavBar';

const LogIn = () => {

    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        if(email === "" || password ===""){
            toast.error('Please enter email and password!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return;
        }

        fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCrHf6mBaugVBBp3iRU03PWKO624o9NFQQ",{
            method: "POST",
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
            }),
            headers:{
                "Content-Type": "application/json"
            }
        }).then((res) => {
            if(res.ok){
                navigate('/home')
                return res.json();
            }else{
                return res.json().then((data) => {
                    throw new Error(data.error.message);
                });
            }
        })
        .then((data) => {
            toast.success("Successfully Logged In", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
            });
        })
        .catch((err) => {
            toast.error(err.message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        })

    }
  return (
    <Fragment>
        <NavBar />
        <Container className="mt-5 d-flex justify-content-center align-items-center">
            <Card>
                <Card.Header style={{backgroundColor: '#0B5ED7', color:"white"}}>
                    <h3>Log In</h3>
                </Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" required/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required/>
                        </Form.Group>

                        <Button variant="primary" type="submit" onClick={handleSubmit} style={{borderRadius:30, width:250 }}>
                            Log In
                        </Button>
                    </Form>
                </Card.Body>
                <Card.Footer style={{backgroundColor: '#D1FFBD'}}>
                    Don't have an account?<a href='/signup'> SignUp </a>
                </Card.Footer>
            </Card>
        </Container>
        <ToastContainer />
    </Fragment>
  )
}

export default LogIn
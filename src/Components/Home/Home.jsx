import React, { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import {MdDeleteForever} from 'react-icons/md'
import NavBar from '../Navbar/NavBar';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Home.css'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

  const Home = () => {
    const [value, setValue] = useState('');
    const [subject, setSubject] = useState('');
    const [recipient, setRecipient] = useState('');
    const dispatch = useDispatch();
    const email = useSelector((state) => state.auth.email).replace(/[@.]/g, "");
    const [recipients, setRecipients] = useState([]);
    

    const handleSubjectChange = (event) => {
      setSubject(event.target.value);
    };

    const handleRecipientChange = (event) => {
      setRecipient(event.target.value);
    };

    const handleAddRecipient = () => {
      if (recipient) {
        setRecipients([...recipients, recipient]);
        setRecipient('');
      }
    };

    const handleRemoveRecipient = (index) => {
      const newRecipients = [...recipients];
      newRecipients.splice(index, 1);
      setRecipients(newRecipients);
    };

    const handleSendEmail = (e) => {
      e.preventDefault();
      const emailDetails = [
        value,
        subject,
        recipient
      ]
      fetch(
        `https://api-calls-70500-default-rtdb.firebaseio.com/mails/${email}.json`,
      {
        method: "POST",
        body: JSON.stringify(emailDetails),
        headers: {
          "Content-Type": "application/json"
        }
      }
      ).then((res) => {
        if(res.ok){
          toast.success('Your new account is created', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
          return res.json();
        }else{
          return res.json().then((data) => {
            throw new Error(data.error.message);
          })
        }
      })
      // .the((data) => {
      //   const newEmailData = { ...emailDetails, id: data.name };
      //   dispatch(listAction) 
      // })
      setRecipient('')
      setSubject('')
      setValue('');
    };

    const handleDelete = (e) => {
      e.preventDefault();
    }

    const modules = {
      toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false]}],
        [{ font: [] }],
        [{ size: [] }],
        [ "bold", "italic", "underline", "strike", "blockquote" ],
        ['formula'],
        [
          {list: 'ordered'},
          {list: 'bullet'},
          { align: [] },
          {indent: '-1'},
          {indent: '+1'},
          {list: 'ordered'},
        ],
        ["link", 'image', 'video'],
        ['clean'],
        [{ color: [] }, { background: [] }],
      ]
    }

    return (
      <div>
        <NavBar />
        <div className='p-5'>
          <div>
            <InputGroup>
              <InputGroup.Text id="inputGroup-sizing-default">
                To
              </InputGroup.Text>
              <Form.Control
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                type='email'
                className='recipient-input'
                value={recipient}
                onChange={handleRecipientChange}
              />
            </InputGroup>
          </div><hr />
          <div>
            <InputGroup>
             <Form.Control
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                placeholder="Subject"
                value={subject}
                onChange={handleSubjectChange}
              /> 
            </InputGroup>
          </div><hr />
          <div>
            <ReactQuill 
              className='editor-input' 
              theme="snow" 
              value={value} 
              onChange={setValue}
              modules={modules} 
            />
          </div><hr /><br />
          <div className='Btn'>
            <div>
              <Button onClick={handleSendEmail}>Send</Button>
            </div>
            <div>
              <Button variant='danger' onClick={handleDelete}><MdDeleteForever /></Button>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    );
  }

  export default Home;

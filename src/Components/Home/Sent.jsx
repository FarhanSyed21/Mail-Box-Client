import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Button, Nav } from "react-bootstrap";
import { FaInbox } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import NavBar from "../Navbar/NavBar";
import "./Sent.css";
import { AiFillDelete } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { mailActions } from "../ReduxStore/mailSlice";

const Sent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const Email = useSelector((state) => state.auth.email).replace(/[@.]/g, "");
  const sentEmails = useSelector((state) => state.mail.SentEmails);
  const [selectedFolder, setSelectedFolder] = useState("sent");
  const inboxEmails = useSelector((state) => state.mail.InboxEmails);
  const unreadCount = inboxEmails.filter((email) => !email.read).length;

  const updateEmail = async (email) => {
    const updatedEmail = {
      sender: email.sender,
      emailHeWantToSend: email.emailHeWantToSend,
      subject: email.subject,
      desc: email.desc,
      read: true
    };

    if (email.read === false) {
      try {
        let response = await fetch(
          `https://api-calls-70500-default-rtdb.firebaseio.com/mails/${Email}/inboxEmails/${email.id}.json`,
          {
            method: "PUT",
            body: JSON.stringify(updatedEmail),
            headers: {
              "Content-Type": "application/json"
            }
          }
        );
        let data = await response.json();
        if (response.ok) {
          dispatch(mailActions.SetCurrentEmail({ email: updatedEmail }));
          dispatch(mailActions.MarkAsSentRead({ id: email.id }));
          navigate("/details");
        } else {
          throw new Error(data.error.message);
        }
      } catch (error) {
        toast.error(error.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored"
        });
      }
    }
    dispatch(mailActions.SetCurrentEmail({ email: updatedEmail }));
    navigate("/details");
  };

  const handleDelete = async (emailId) => {
    try {
      const response = await fetch(
        `https://api-calls-70500-default-rtdb.firebaseio.com/mails/${Email}/sentEmails/${emailId}.json`,
        {
          method: "DELETE"
        }
      );

      if (response.ok) {
        dispatch(mailActions.SentRemove(emailId));
        toast.success("Email deleted successfully", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored"
        });
      } else {
        throw new Error("Failed to delete email");
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
      });
    }
  };

  return (
    <Fragment>
      <NavBar />
      <Container fluid>
        <Row>
          <Col md={2} className="folder-list">
            <Nav className="flex-column">
              <Button
                className="mb-3 mt-3"
                onClick={() => navigate("/compose")}
              >
                Compose
              </Button>
              <Nav.Link
                onClick={() => navigate("/home")}
                className={selectedFolder === "inbox" ? "active" : ""}
              >
                <div className="inbox-link">
                  <span className="inbox-label">Inbox</span>
                  <span className="unread-count">Unread {unreadCount}</span>
                </div>
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  navigate("/sent");
                }}
                className={selectedFolder === "sent" ? "active" : ""}
              >
                Sent
              </Nav.Link>
            </Nav>
          </Col>
          <Col md={10} className="mail-view ">
            {sentEmails.length === 0 ? (
              <div className="empty-inbox">
                <div className="empty-icon">
                  <FaInbox />
                </div>
                <p className="empty-message">You don't have any sent mail.</p>
              </div>
            ) : (
              <ul>
                {sentEmails.map((email) => (
                  <li
                    className={
                      email.read ? "read mail-item" : "Unread mail-item"
                    }
                    key={email.id}
                  >
                    <div className="checkbox">
                      {email.read ? null : <span className="dot" />}
                    </div>
                    <div className="details">
                      <div className="sender">{email.sender}</div>
                    </div>
                    <div className="snippet">
                      <h3
                        className={email.read ? "ReadedSub sub" : "sub"}
                        onClick={() => updateEmail(email)}
                      >
                        {email.subject}
                      </h3>
                    </div>
                    <div className="delete-button">
                      <Button
                        variant="warning"
                        className="delete-button"
                        onClick={() => handleDelete(email.id)}
                      >
                        <AiFillDelete />
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </Fragment>
  );
};

export default Sent;

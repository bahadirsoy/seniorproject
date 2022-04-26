//import react components
import React, { useState, useEffect } from 'react';

//import styles
import './adminhomepage.styles.css'

//import custom components
import CustomInput from '../../components/custominput/custominput.component';

//import react strap components
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';

//import axios
import Axios from 'axios'

//import navigate
import { useNavigate } from 'react-router-dom';

//import session and cookies
import { useCookies } from 'react-cookie';

//import react router
import { Link } from 'react-router-dom';


function AdminHomePage(props){

    //users
    const [users, setUsers] = useState('')

    //get all users and their informations
    useEffect(() => {
        Axios.get("http://localhost:3001/api/getAllUsersForAdmin", {
        
        })
        .then((response) => {
            setUsers(response.data)
        })
    }, [])

    return(
        <div className='mt-5'>
            <Container>
                <Row>
                    <Col>
                        <h1> Users </h1>

                        <table className="table mt-5">
                            <thead>
                                <tr>
                                    <th scope="col">Username</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Surname</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Phone</th>
                                    <th scope="col">Sign up date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users ?
                                    users.map(user => {
                                        return(
                                            <tr key={user.userId}>
                                                <td>{user.username}</td>
                                                <td>{user.name}</td>
                                                <td>{user.surname}</td>
                                                <td>{user.email}</td>
                                                <td>{user.phone}</td>
                                                <td>{user.signupdate}</td>
                                            </tr>
                                        )
                                    }) :
                                    null
                                }
                            </tbody>
                        </table>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default AdminHomePage;
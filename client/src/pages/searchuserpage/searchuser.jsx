//import styles
import './searchuser.styles.css'

//import react bootstrap components
import { Container, Row, Col, InputGroup, FormControl, Table } from 'react-bootstrap';

//import fontawesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

//import react components
import { useEffect, useState } from 'react';

//import Axios
import Axios from 'axios'

function SearchUser(){
    //all users
    const [users, setUsers] = useState('')

    useEffect(() => {
        Axios.get('http://localhost:3001/api/getAllUsers', {
            
        }).then((response) => { //feedback from api
            setUsers(response.data)
        })
    }, [])

    return(
        <Container className='mt-5'>
            <Row>
                <Col xs={12}>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">
                            <FontAwesomeIcon className='mx-4' icon={faSearch} />
                        </InputGroup.Text>
                        
                        <FormControl
                        placeholder="Type username to search user"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                </Col>

                <Col className='mt-4'>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Fullname</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users ?
                                users.map(user => {
                                    console.log(user)
                                    return(
                                        <tr key={user.userId}>
                                            <td>{user.username}</td>
                                            <td>{user.name + " " + user.surname}</td>
                                            <td><button></button></td>
                                        </tr>
                                    )
                                }) :
                                null
                            }
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    )
}

export default SearchUser

//import react
import React from 'react';

//import styles
import './custominput.styles.css'

//import reactstrap components
import { InputGroup, Form, FormControl } from 'react-bootstrap'


function CustomInput(props){
    return(
        <span   >
            {
                props.labelName ?
                <Form.Label htmlFor={props.formId}> {props.labelName} </Form.Label> :
                null
            }
            <InputGroup className="mb-3">

                <InputGroup.Text 
                    id={props.inputNameId}>
                    {props.inputName}
                </InputGroup.Text>

                <FormControl 
                    type = {props.type}
                    name = {props.name}
                    id={props.formId} 
                    aria-describedby={props.inputNameId}
                    placeholder={props.placeholder}
                    value={props.value}
                    onChange = {props.onchange}
                    readOnly = {props.readonly}
                />
            </InputGroup>
        </span>
    )
}

export default CustomInput;
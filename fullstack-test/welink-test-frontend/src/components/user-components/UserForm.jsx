import "./style.css";
import React from "react";
import {Button, Container, Form, Input} from "semantic-ui-react";

function UserForm(props) {
  const {firstName, lastName, email} = props.values;
  return (
    <React.Fragment>
      <Container className='main-container'>
        <Container className='form-container'>
          <Form>
            <Form.Field
              required
              control={Input}
              label='First Name'
              value={firstName}
              name='firstName'
              onChange={props.handleChange}
            />
            <Form.Field
              required
              control={Input}
              label='Last Name'
              value={lastName}
              name='lastName'
              onChange={props.handleChange}
            />
            <Form.Field
              required
              control={Input}
              label='Email'
              value={email}
              name='email'
              onChange={props.handleChange}
            />
            <Button onClick={props.next}>Next</Button>
          </Form>
        </Container>
      </Container>
    </React.Fragment>
  );
}

export default UserForm;

import React from "react";
import {Button, Container, Form, TextArea} from "semantic-ui-react";

function FeedbackForm(props) {
  const {feedback} = props.values;
  return (
    <Container className='main-container'>
      <Form.Field
        required
        control={TextArea}
        label='Feedback'
        value={feedback}
        name='feedback'
        onChange={props.handleChange}
      />
      <Button onClick={props.prev}>Back</Button>
      <Button coor='blue' type='submit'>
        Send
      </Button>
    </Container>
  );
}

export default FeedbackForm;

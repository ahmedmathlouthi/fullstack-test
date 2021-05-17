import React from "react";
import {Container} from "semantic-ui-react";

function Success() {
  return (
    <Container className='success-container'>
      <h2>Thanks!</h2>
      <br />
      <p>Thank you for your feedback!</p>
      <br />
      <p>Our team will get back to you soon</p>
    </Container>
  );
}

export default Success;

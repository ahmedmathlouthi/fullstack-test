import React from "react";
import {Container} from "semantic-ui-react";

function Error(props) {
  return (
    <Container className='Error-container'>
      <p>{props.message}</p>
    </Container>
  );
}

export default Error;

import React, {useState} from "react";
import "./style.css";
import {Container} from "semantic-ui-react";

import {Form} from "semantic-ui-react";
import UserForm from "../user-components/UserForm";
import FeedbackForm from "../feedback-components/FeedbackForm";
import Success from "../common-ui/Success";
import Error from "../common-ui/Error";
import API from "../../api";

function MainFormContainer() {
  const [allValues, setAllValues] = useState({
    step: 1,
    firstName: "",
    lastName: "",
    email: "",
    feedback: "",
    error: "",
  });

  const handleSubmit = (e) => {
    const {firstName, lastName, email, feedback} = allValues;
    e.preventDefault();
    //just show the success page (step 4 )
    setAllValues((prevState) => {
      return {
        ...prevState,
      };
    });

    API.post("/feedbacks", {
      body: feedback,
      user: {
        firstname: firstName,
        lastname: lastName,
        email: email,
      },
    })
      .then(function (response) {
        console.log("resp", response);
        setAllValues((prevState) => {
          return {
            ...prevState,
            step: 3,
          };
        });
      })
      .catch(function (error) {
        setAllValues({
          error: JSON.stringify(error.response.data.message),
        });
        console.log("err", JSON.stringify(error.response.data.message));
      })
  };

  const handleChange = (event, {name, value, checked, type}) => {
    console.log("state values", name, " ", value);
    setAllValues((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const next = () => {
    setAllValues((prevState) => {
      return {
        ...allValues,
        step: prevState.step + 1,
      };
    });
  };

  const prev = () => {
    setAllValues((prevState) => {
      return {
        ...allValues,
        step: prevState.step - 1,
      };
    });
  };

  const {step, error} = allValues;

  return (
    <Container textAlign='left'>
      <Form onSubmit={handleSubmit}>
        <Step
          step={step}
          values={allValues}
          handleChange={handleChange}
          next={next}
          prev={prev}
          message={error}
        />
      </Form>
    </Container>
  );
}

const Step = ({step, values, handleChange, next, prev, message}) => {
  switch (step) {
    case 1:
      return (
        <UserForm values={values} handleChange={handleChange} next={next} />
      );
    case 2:
      return (
        <FeedbackForm
          values={values}
          handleChange={handleChange}
          next={next}
          prev={prev}
        />
      );
    case 3:
      return <Success values={values} />;
    default:
      return <Error message={message} />;
  }
};

export default MainFormContainer;

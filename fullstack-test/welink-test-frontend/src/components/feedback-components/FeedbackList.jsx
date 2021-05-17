import React, {useEffect, useState} from "react";
import {Card, Container, Search, Select} from "semantic-ui-react";
import API from "../../api";
import "./style.css";

function FeedbackList() {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [filterAttributes, setfilterAttributes] = useState({
    filterAttribute: "",
    filterCriteria: "",
  });

  const getData = async () => {
    let data = await fetchDataCall();
    setLoading(false);
    setData(data);
  };

  const filterData = async () => {
    let data = await getFilteredFeedbacks();
    setData(data);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    try {
      if (searchValue || filterAttributes) {
        filterData();
      } else {
        getData();
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }, [searchValue, filterAttributes]);

  const handleSeach = (event, {value}) => {
    setSearchValue(value);
  };

  const handleSelectionChange = (event, {value, name}) => {
    setfilterAttributes((prevState) => {
      return {...prevState, [name]: value};
    });
  };

  let FeedbackListToRender;
  if (data && data.data !== undefined) {
    FeedbackListToRender = data.data.data.map((feedback) => (
      <Card fluid>
        <Card.Content>
          <Card.Header>{feedback.attributes.body}</Card.Header>
          <Card.Description>
            <p>
              <b>User:</b> {feedback.attributes.user.firstname}{" "}
              {feedback.attributes.user.lastname}
            </p>
            <p>
              <b>Email:</b> {feedback.attributes.user.email}{" "}
            </p>
          </Card.Description>
        </Card.Content>
      </Card>
    ));
  }
  const filterAttributesOptions = [
    {key: "firstname", value: "firstname", text: "First Name"},
    {key: "lastname", value: "lastname", text: "Last Name"},
    {key: "email", value: "email", text: "Email"},
  ];

  const filterCriteriasOptions = [
    {key: "asc", value: "asc", text: "Ascending"},
    {key: "desc", value: "desc", text: "Descending"},
  ];
  return (
    <Container className='main-container'>
      <Search
        showNoResults={false}
        className='search-input'
        input={{icon: "search", iconPosition: "left"}}
        loading={isLoading}
        onSearchChange={handleSeach}
        value={searchValue}
      />
      <Select
        className='search-input'
        placeholder='Filter By'
        options={filterAttributesOptions}
        onChange={handleSelectionChange}
        name='filterAttribute'
        value={filterAttributes.filterAttribute}
      />
      <Select
        className='search-input'
        placeholder='Filter Criteria'
        options={filterCriteriasOptions}
        onChange={handleSelectionChange}
        name='filterCriteria'
        value={filterAttributes.filterCriteria}
      />
      <Card.Group>{FeedbackListToRender}</Card.Group>
    </Container>
  );

  async function fetchDataCall() {
    try {
      const response = await API.get("/feedbacks");
      return response;
    } catch (error) {
      console.log("error", error);
    }
  }
  async function getFilteredFeedbacks() {
    const {filterAttribute, filterCriteria} = filterAttributes;
    try {
      const response = await API.get(
        `/feedbacks?q=${searchValue}&o=${filterAttribute}&d=${filterCriteria}`
      );
      setLoading(false);
      return response;
    } catch (error) {
      console.log("error in seach", error);
    }
  }
}

export default FeedbackList;

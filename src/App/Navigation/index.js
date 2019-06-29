import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";

import * as routes from "../../constants/routes";
import Button from "../../Button";

import './style.css'
import styled from 'styled-components';

const Input = styled.input`
  border: solid 1px #dbdbdb;
  color:black;
  text-align: left;
  padding: 10px;
  background: #f5f5f5;
  &:focus {
    outline: none;
  }
`

const Brand = styled.h1`
  margin-left: 20px;
  color: orange;
  padding-top: 10px;
`

const Navigation = ({
  location: { pathname },
  queryString,
  setQuerySearch
}) => (
  <header className="Navigation">
    <Brand>StarQuest</Brand>
    <div className="Navigation-link">
      <Link to={routes.STARRED_REPOS}>Starred Repos</Link>
    </div>
    <div className="Navigation-link">
      <Link to={routes.QUERY_TERM}>Search for Repos</Link>
    </div>

    {pathname === routes.QUERY_TERM && (
      <QuerySearch
        queryString={queryString}
        setQuerySearch={setQuerySearch}
      />
    )}
  </header>
);

const QuerySearch = (props) => {
  const [term, setTerm] = useState(props.queryString);
  return (
    <div className="Navigation-search">
      <form
        onSubmit={e => {
          props.setQuerySearch(term);
          e.preventDefault();
        }}
      >
        <Input
          type="text"
          value={term}
          onChange={e => setTerm(e.target.value)}
        />{" "}
        <Button black type="submit">
          Search
        </Button>
      </form>
    </div>
  );
};
export default withRouter(Navigation);

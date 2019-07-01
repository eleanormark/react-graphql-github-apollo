import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import * as routes from "../../constants/routes";
import Button from "../Button";
import styled from "styled-components";
import { device } from "../../constants/device";

const Input = styled.input`
  border: solid 1px #dbdbdb;
  color: black;
  font-size: 14px;
  text-align: left;
  padding: 10px;
  background: #f5f5f5;
  &:focus {
    outline: none;
  }
`;

const Brand = styled.h1`
  margin-left: 20px;
  color: orange;
  padding-top: 10px;
  @media ${device.screenM} {
    margin-left: 0px;
  }
`;

const Nav = styled.header`
  overflow: hidden;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1;
  background-color: #24292e;
  display: flex;
  align-items: baseline;
  @media ${device.screenM} {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-bottom: 10px;
    text-align: center;
  }
`;

const NavLink = styled.div`
  font-size: 12px;
  letter-spacing: 3.5px;
  font-weight: 500;
  text-transform: uppercase;
  padding: 20px;
  a {
    text-decoration: none;
    color: #ffffff;
    &:hover {
      color: orange;
    }
  }
  @media ${device.screenS} {
    padding-bottom: 10px;
  }
`;

const NavSearch = styled.div`
  padding: 0 10px;
  @media ${device.screenS} {
    padding: 10px 10px;
  }
`;

export const Navigation = ({
  location: { pathname },
  queryString,
  setQuerySearch
}) => (
  <Nav>
    <Brand>StarQuest</Brand>
    <NavLink>
      <Link to={routes.STARRED_REPOS}>Starred Repos</Link>
    </NavLink>
    <NavLink>
      <Link to={routes.QUERY_TERM}>Search for Repos</Link>
    </NavLink>

    {pathname === routes.QUERY_TERM && (
      <QuerySearch queryString={queryString} setQuerySearch={setQuerySearch} />
    )}
  </Nav>
);

export const QuerySearch = props => {
  const [term, setTerm] = useState(props.queryString);
  return (
    <NavSearch>
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
    </NavSearch>
  );
};
export default withRouter(Navigation);

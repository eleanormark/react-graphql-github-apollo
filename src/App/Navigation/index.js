import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";

import * as routes from "../../constants/routes";
import Button from "../../Button";
import Input from "../../Input";

const Navigation = ({
  location: { pathname },
  queryString,
  setQuerySearch
}) => (
  <header className="Navigation">
    <div className="Navigation-link">
      <Link to={routes.PROFILE}>Profile</Link>
    </div>
    <div className="Navigation-link">
      <Link to={routes.QUERY_TERM}>Organization</Link>
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
          color={"white"}
          type="text"
          value={term}
          onChange={e => setTerm(e.target.value)}
        />{" "}
        <Button color={"white"} type="submit">
          Search
        </Button>
      </form>
    </div>
  );
};
export default withRouter(Navigation);

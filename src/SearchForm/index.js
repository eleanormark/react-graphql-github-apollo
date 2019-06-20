import React, { useState } from "react";
import './style.css';

const SearchForm = () => {
    const [queryTerm, setQueryTerm] = useState('');

    return (
        <form className="form-inline">
            <input type="text" placeholder="Search" />
            <button type="submit">Submit</button>
        </form>
    )
}

export default SearchForm;
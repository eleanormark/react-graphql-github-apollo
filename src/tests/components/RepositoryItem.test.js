import React from 'react';
import { shallow, mount} from 'enzyme';
import 'jest-styled-components';
import RepositoryItem from "../../components/Repository/RepositoryItem";
import repos from '../fixture/repos';

test("should render RepositoryItem correctly", () => {
    const wrapper = shallow(<RepositoryItem repos = {repos[0]}/>);
    // wrapper.find('Button').stimulate('click')
    // expect(wrapper.find('Button').text).toBe('1 Unstar');
    expect(wrapper).toMatchSnapshot();
});
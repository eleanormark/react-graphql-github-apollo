import React from 'react';
import { shallow, mount} from 'enzyme';
import { Navigation } from '../../components/App/Navigation';
import 'jest-styled-components'

test("should render Navigation correctly without <QuerySearch />", () => {
    const wrapper = shallow(<Navigation location={{pathname:"/StarredRepos"}} />);
    expect(wrapper).toMatchSnapshot();
});

test("should render Navigation correctly with <QuerySearch />", () => {
    const wrapper = shallow(<Navigation location={{pathname:"/"}} />);
    expect(wrapper).toMatchSnapshot();
});
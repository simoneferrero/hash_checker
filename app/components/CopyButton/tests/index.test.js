import React from 'react';
import { shallow } from 'enzyme';

import { Button } from 'semantic-ui-react';
import GoClippy from 'react-icons/lib/go/clippy';
import GoCheck from 'react-icons/lib/go/check';

import CopyButton from '../index';

const renderComponent = (props = {}) => (
  shallow(<CopyButton {...props} />)
);

describe('<CopyButton />', () => {
  it('renders a Button component', () => {
    const renderedComponent = renderComponent();
    expect(renderedComponent.find(Button).length).toEqual(1);
  });

  it('renders a GoClippy icon', () => {
    const renderedComponent = renderComponent();
    expect(renderedComponent.find(GoClippy).length).toEqual(1);
  });

  it('renders a GoCheck icon on click', () => {
    const renderedComponent = renderComponent();
    renderedComponent.simulate('click');
    expect(renderedComponent.find(GoCheck).length).toEqual(1);
  });

  it('sets a timeout on click', () => {
    jest.useFakeTimers();

    const { handleClick } = renderComponent().instance();
    handleClick();

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 2000);
  });
});

import React from 'react';
import { shallow } from 'enzyme';

import GoClippy from 'react-icons/lib/go/clippy';

import LatestHash from '../index';

const renderComponent = (props = {}) => shallow(
  <LatestHash {...props} onClick={() => {}} />
);

const url = '2018-02-05T15:40:23Z';
const sha = '93b02ffd52c069fa21bc0c919405278ab0758ce5';

const propsSuccess = {
  url,
  sha,
};

describe('<LatestHash />', () => {
  it('renders a substring of sha', () => {
    const renderedComponent = renderComponent({ branch: propsSuccess });

    expect(renderedComponent.contains('93b02ff')).toBe(true);
  });

  it('renders a copy icon', () => {
    const renderedComponent = renderComponent({ branch: propsSuccess });

    expect(renderedComponent.find(GoClippy).length).toBe(1);
  });

  it('changes state when handleHover is called', () => {
    const renderedComponent = renderComponent({ branch: propsSuccess });

    renderedComponent.instance().handleHover();
    expect(renderedComponent.state('iconVisible')).toBe(true);
  });
});

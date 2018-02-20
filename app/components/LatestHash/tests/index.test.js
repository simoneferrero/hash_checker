import React from 'react';
import { shallow } from 'enzyme';

import GoClippy from 'react-icons/lib/go/clippy';

import LatestHash from '../index';

const renderComponent = (props = {}) => shallow(
  <LatestHash {...props} onClick={() => {}} />
);

const date = '2018-02-05T15:40:23Z';
const error = 'Some error';
const sha = '93b02ffd52c069fa21bc0c919405278ab0758ce5';

const propsSuccess = {
  date,
  sha,
};

const propsError = {
  error,
};

const propsUndefined = {
  date: undefined,
  sha: undefined,
};

const propsAll = {
  date,
  error,
  sha,
};

const loading = 'loading...';

describe('<LatestHash />', () => {
  it('renders a formatted date', () => {
    const renderedComponent = renderComponent({ latest: propsSuccess });

    expect(renderedComponent.contains('05/02/18')).toBe(true);
  });

  it('renders a substring of sha', () => {
    const renderedComponent = renderComponent({ latest: propsSuccess });

    expect(renderedComponent.contains('93b02ff')).toBe(true);
  });

  it('renders a copy icon', () => {
    const renderedComponent = renderComponent({ latest: propsSuccess });

    expect(renderedComponent.find(GoClippy).length).toBe(1);
  });

  it('renders an error if present', () => {
    const renderedComponent = renderComponent({ latest: propsError });

    expect(renderedComponent.contains(error)).toBe(true);
  });

  it('does not render info if an error if present', () => {
    const renderedComponent = renderComponent({ latest: propsAll });

    expect(renderedComponent.contains('05/02/18')).toBe(false);
    expect(renderedComponent.contains('93b02ff')).toBe(false);
  });

  it('displays a loader if the details have not been loaded yet', () => {
    const renderedComponent = renderComponent({ latest: propsUndefined });

    expect(renderedComponent.contains(loading)).toBe(true);
  });

  it('changes state when handleHover is called', () => {
    const renderedComponent = renderComponent({ latest: propsSuccess });

    renderedComponent.instance().handleHover();
    expect(renderedComponent.state('iconVisible')).toBe(true);
  });
});

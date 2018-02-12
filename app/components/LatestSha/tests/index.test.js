import React from 'react';
import { shallow } from 'enzyme';

import LatestSha from '../index';

const renderComponent = (props = {}) => shallow(
  <LatestSha {...props} />
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

const propsAll = {
  date,
  error,
  sha,
};

describe('<LatestSha />', () => {
  it('renders a formatted date', () => {
    const renderedComponent = renderComponent({ latest: propsSuccess });

    expect(renderedComponent.contains('February 5th 2018, 03:40:23pm')).toBe(true);
  });

  it('renders a substring of sha', () => {
    const renderedComponent = renderComponent({ latest: propsSuccess });

    expect(renderedComponent.contains('93b02ff')).toBe(true);
  });

  it('renders an error if present', () => {
    const renderedComponent = renderComponent({ latest: propsError });

    expect(renderedComponent.contains(error)).toBe(true);
  });

  it('does not render info if an error if present', () => {
    const renderedComponent = renderComponent({ latest: propsAll });

    expect(renderedComponent.contains('February 5th 2018, 03:40:23pm')).toBe(false);
    expect(renderedComponent.contains('93b02ff')).toBe(false);
  });
});

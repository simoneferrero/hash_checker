/**
*
* LatestSha
*
*/

import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

import classnames from 'classnames';
import styles from './styles.css';

const LatestSha = ({
  latest,
}) => {
  const {
    date,
    error,
    sha,
  } = latest;

  const className = classnames({
    [styles.error]: !!error,
    [styles.latestSha]: true,
  });

  if (error) {
    return (
      <div className={className}>{ error }</div>
    );
  }

  return (
    <div className={className}>
      <div>Date: { date && moment.utc(new Date(date)).format('MMMM Do YYYY, hh:mm:ssa') }</div>
      <div>Sha: { sha && sha.substring(0, 7) }</div>
    </div>
  );
};

LatestSha.propTypes = {
  latest: PropTypes.shape({
    date: PropTypes.string,
    sha: PropTypes.string,
  }).isRequired,
};

LatestSha.defaultProps = {
  latest: {
    date: '',
    sha: '',
  },
};

export default LatestSha;

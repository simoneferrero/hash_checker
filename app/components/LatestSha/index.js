/**
*
* LatestSha
*
*/

import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

import styles from './styles.css';

const LatestSha = ({
  latest,
}) => (
  <div className={styles.latestSha}>
    <div>Date: { moment.utc(new Date(latest.date)).format('MMMM Do YYYY, hh:mm:ssa') }</div>
    <div>Sha: { latest.sha.substring(0, 7) }</div>
  </div>
);

LatestSha.propTypes = {
  latest: PropTypes.shape({
    date: PropTypes.string.isRequired,
    sha: PropTypes.string.isRequired,
  }).isRequired,
};

LatestSha.defaultProps = {
  latest: {
    date: '',
    sha: '',
  },
};

export default LatestSha;

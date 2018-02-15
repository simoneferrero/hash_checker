/**
*
* LatestSha
*
*/

import React from 'react';
import PropTypes from 'prop-types';

import Clipboard from 'react-clipboard.js';
import moment from 'moment';
import { toastr } from 'react-redux-toastr';

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

  const wrapperStyle = classnames({
    [styles.error]: !!error,
    [styles.latestSha]: true,
  });

  if (error) {
    return (
      <div className={wrapperStyle}>{ error }</div>
    );
  }

  if (!sha) {
    return (
      <div className={wrapperStyle}>loading...</div>
    );
  }

  const shaSubstring = sha && sha.substring(0, 7);

  return (
    <Clipboard
      button-className={styles.copyToClipboard}
      button-disabled={!sha}
      component={'div'}
      data-clipboard-text={shaSubstring}
      onSuccess={() => toastr.info(shaSubstring, 'Copied to clipboard')}
    >
      <div className={wrapperStyle}>
        <div>{ date && moment.utc(new Date(date)).format('DD/MM/YY, hh:mm:ssa') }</div>
        { shaSubstring || 'loading...' }
      </div>
    </Clipboard>
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

/**
*
* LatestSha
*
*/

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Clipboard from 'react-clipboard.js';
import moment from 'moment';
import { toastr } from 'react-redux-toastr';
import GoClippy from 'react-icons/lib/go/clippy';

import classnames from 'classnames';
import styles from './styles.css';

export default class LatestSha extends PureComponent {
  state = {
    iconVisible: false,
  }

  handleHover = () => {
    this.setState({
      iconVisible: !this.state.iconVisible,
    });
  }

  render() {
    const {
      date,
      error,
      sha,
    } = this.props.latest;

    const latestShaStyle = classnames({
      [styles.error]: !!error,
      [styles.latestSha]: true,
    });

    const iconStyle = classnames({
      [styles.icon]: true,
      [styles.iconVisible]: this.state.iconVisible,
    });

    if (error) {
      return (
        <div className={latestShaStyle}>{ error }</div>
      );
    }

    if (!sha) {
      return (
        <div className={latestShaStyle}>loading...</div>
      );
    }

    const shaSubstring = sha && sha.substring(0, 7);

    const shaDiv = (
      <div>
        <GoClippy className={iconStyle} />
        <span>{ shaSubstring }</span>
      </div>
    );

    return (
      <Clipboard
        button-className={styles.wrapper}
        button-disabled={!sha}
        component={'div'}
        data-clipboard-text={shaSubstring}
        onSuccess={() => toastr.info(shaSubstring, 'Copied to clipboard')}
      >
        <div // eslint-disable-line
          className={latestShaStyle}
          id="test"
          onMouseOut={() => this.handleHover()}
          onMouseOver={() => this.handleHover()}
          title="Click to copy SHA to clipboard"
        >
          { shaSubstring ? shaDiv : 'loading...' }
          <div>{ date && moment.utc(new Date(date)).format('DD/MM/YY') }</div>
        </div>
      </Clipboard>
    );
  }
}

LatestSha.propTypes = {
  latest: PropTypes.shape({
    date: PropTypes.string,
    sha: PropTypes.string,
    error: PropTypes.string,
  }).isRequired,
};

LatestSha.defaultProps = {
  latest: {
    date: '',
    sha: '',
  },
};

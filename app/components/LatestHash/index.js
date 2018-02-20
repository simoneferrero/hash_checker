/**
*
* LatestHash
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

export default class LatestHash extends PureComponent {
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

    const latestHashStyle = classnames({
      [styles.error]: !!error,
      [styles.latestHash]: true,
    });

    const iconStyle = classnames({
      [styles.icon]: true,
      [styles.iconVisible]: this.state.iconVisible,
    });

    if (error) {
      return (
        <div className={latestHashStyle}>{ error }</div>
      );
    }

    if (!sha) {
      return (
        <div className={latestHashStyle}>loading...</div>
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
          className={latestHashStyle}
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

LatestHash.propTypes = {
  latest: PropTypes.shape({
    date: PropTypes.string,
    sha: PropTypes.string,
    error: PropTypes.string,
  }).isRequired,
};

LatestHash.defaultProps = {
  latest: {
    date: '',
    sha: '',
  },
};

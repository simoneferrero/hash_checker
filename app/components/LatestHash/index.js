/**
*
* LatestHash
*
*/

import React, { PureComponent } from 'react';

import Clipboard from 'react-clipboard.js';
import { toastr } from 'react-redux-toastr';
import GoClippy from 'react-icons/lib/go/clippy';

import {
  commitType,
} from 'types';

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
      sha,
      // url,
    } = this.props.branch;

    const latestHashStyle = classnames({
      [styles.latestHash]: true,
    });

    const iconStyle = classnames({
      [styles.icon]: true,
      [styles.iconVisible]: this.state.iconVisible,
    });

    const shaSubstring = sha && sha.substring(0, 7);

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
          <div>
            <GoClippy className={iconStyle} />
            <span>{ shaSubstring }</span>
          </div>
        </div>
      </Clipboard>
    );
  }
}

LatestHash.propTypes = {
  branch: commitType.isRequired,
};

import React from 'react';
import {CSSTransition} from 'react-transition-group';

class NotificationMessageModal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onEntered = this.onEntered.bind(this);
  }
  onEntered() {
    this.props.notifyState({
      showNotificationMessageModal: false
    });
  }

  render() {
    return (
      <div>
        <CSSTransition
          in={this.props.showModal}
          classNames={this.props.className}
          timeout={this.props.timeout}
          onEntered={this.onEntered}
          >
            <p className={this.props.className}>{this.props.message}</p>
        </CSSTransition>
      </div>
    );
  }
}

export default NotificationMessageModal;

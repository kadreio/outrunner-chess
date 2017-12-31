import * as React from 'react';
import * as style from './style.css';
import * as GameActions from '../../actions/board';
import { bindActionCreators } from 'redux';
import firebase from 'firebase';
import * as firebaseui from 'firebaseui';
import { RootState } from '../../reducers';
import { createBrowserHistory } from 'history';

import "!style-loader!css-loader!firebaseui/dist/firebaseui.css";
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';

export namespace Chess {
  export interface Props extends RouteComponentProps<void> {
    actions: typeof GameActions;
    user: User;
  }
}
const ui = new firebaseui.auth.AuthUI(firebase.auth());


@connect(mapStateToProps, mapDispatchToProps)
export class Login extends React.Component<Chess.Props> {
  uiConfig: any;

  constructor(a,b) {
    super(a,b);
    const actions = this.props.actions;

    this.uiConfig = {
      signInFlow: 'popup',
      callbacks: {
        signInSuccess: (currentUser, credential, redirectUrl) => {
          actions.loggedIn({
            id: currentUser.uid,
            displayName: currentUser.email,
            loggedIn: true
          })
          this.props.history.push('/');
          return true;
        },
      },
      signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
      ]
    };

  }
  render() {
    return (
      <div className={style.normal}>
        <h1> Sign In </h1>
        <div id="firebaseui-auth-container"></div>
      </div>
    );
  }

  componentDidMount() {
    ui.start('#firebaseui-auth-container', this.uiConfig);
  }
}

function mapStateToProps(state: RootState) {
  return {
    user: state.game.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(GameActions, dispatch)
  };
}

import firebase from '@firebase/app'
import '@firebase/auth';

import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators } from 'redux';

import * as GameActions from '../../actions/board';
import { EmailLogin } from '../../components/Forms/EmailLogin/index';
import { RootState } from '../../reducers';
import { loggedIn } from '../../actions/board';

export namespace Chess {
  export interface Props extends RouteComponentProps<void> {
    actions: typeof GameActions;
    user: User;
  }
  export interface State {
    loginType: 'EMAIL'|'GOOGLE';
    new: boolean;
    email: string;
    password: string;
    error?: any;
  }
}



@connect(mapStateToProps, mapDispatchToProps)
export class Login extends React.Component<Chess.Props, Chess.State> {
  constructor(a,b) {
    super(a,b);
    const actions = this.props.actions;
    this.state = {
      loginType: 'EMAIL',
      new: false,
      email:'',
      password: ''
    };
  }
  handleLogin() {
    const action = this.state.new ?
      firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password) :
      firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password);

    action.then((user) => {
      this.props.actions.loggedIn({
        id: user.uid,
        displayName: user.email,
        loggedIn: true
      });
      this.props.history.replace('/');
    })
    .catch((error) => {
      this.setState(Object.assign(this.state, {error}));
      console.error(error);
      alert(error.message);
    })
  }

  render() {
    return (
      <div>
        <EmailLogin
          error={this.state.error}
          onSubmit={() => this.handleLogin()}
          onChange={(val) => {console.log(val), this.setState(Object.assign(this.state, val)) }} />
      </div>
    );
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

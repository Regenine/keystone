/** @jsx jsx */

import { jsx } from '@emotion/core';

import { Fragment, Component } from 'react';

import { gql, useMutation } from '@apollo/client';

import { CheckIcon } from '@primer/octicons-react';
import { Button } from '@arch-ui/button';
import { LoadingIndicator } from '@arch-ui/loading';
import { colors } from '@arch-ui/theme';
import { Redirect } from "react-router-dom";
import Animation from '../components/Animation';
import { useAdminMeta } from '../providers/AdminMeta';
import { withRouter } from "react-router";
import axios from 'axios';
import base64url from 'base64url';

const FlexBox = props => (
  <div
    css={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}
    {...props}
  />
);

const Container = props => <FlexBox css={{ minHeight: '100vh' }} {...props} />;

const Caption = props => <p css={{ fontSize: '1.5em' }} {...props} />;

const authSession = async (token64, baseRoute, redirect64) => {
  // token is base 64 url encoded and needs to be unencoded before being placed in the header
  const token = base64url.decode(token64);
  const redirect = base64url.decode(redirect64);
  const options = {
    headers: {'Authorization': `Bearer ${token}`}
  };

  await actuallyAuthorise(`${baseRoute}/auth/adminuisession`, redirect, options);
}

const actuallyAuthorise = async (url, redirect, options) => {
  return await axios.post(url, {redirect}, options);
}

class AuthSessionPage extends Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {authorised: false};
  }

async componentDidMount() {
    const { token64, redirect64 } = this.props.match.params;
    await authSession(token64, this.props.baseRoute, redirect64);
    const redirect = base64url.decode(redirect64);
    this.setState({authorised: true, redirect});
}

render() {
  return (<Container>
     { !this.state.authorised ? 
        (<Fragment>
          <LoadingIndicator css={{ height: '3em' }} size={12} />
          <Caption>Authorising session</Caption>
        </Fragment>) :
    (<Redirect to={this.state.redirect}/>)
        }
    </Container>) 
  
  };
}

export default withRouter(AuthSessionPage);

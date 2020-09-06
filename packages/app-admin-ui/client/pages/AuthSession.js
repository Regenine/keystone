/** @jsx jsx */

import { jsx } from '@emotion/core';

import { Fragment } from 'react';

import { gql, useMutation } from '@apollo/client';

import { CheckIcon } from '@primer/octicons-react';
import { Button } from '@arch-ui/button';
import { LoadingIndicator } from '@arch-ui/loading';
import { colors } from '@arch-ui/theme';

import Animation from '../components/Animation';
import { useAdminMeta } from '../providers/AdminMeta';
import { useParams, useHistory } from 'react-router-dom';
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

  await actuallyAuthorise(`${baseRoute}/auth/adminuisession`, options);
  useHistory().push(redirect);
}

const actuallyAuthorise = async (url, options) => {
  return await axios.get(url, options);
}

const AuthSessionPage =  ({baseRoute}) => {
  const { token64, redirect64 } = useParams();
  authSession(token64, baseRoute, redirect64);
  return (
    <Container>
        <Fragment>
          <LoadingIndicator css={{ height: '3em' }} size={12} />
          <Caption>Authorising session</Caption>
        </Fragment>
    </Container>
  );
};

export default AuthSessionPage;

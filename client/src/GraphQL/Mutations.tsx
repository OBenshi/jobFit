import { gql, useQuery } from '@apollo/client';
/* 
export const LOGIN_USER = gql`
  mutation addUser ($email: String!,$password: String!) {
    user (email:$email, password:$password) {
     email
    }
  }
`; */

//mutation for login, 1. wrote for now "user" but it should be name of the route from the back end. at the end I am returning only email//
import { gql, useQuery } from "@apollo/client";

/* export const LOGIN_USER = gql`
  mutation Mutation($logInInput: logInInput) {
  logIn(input: $logInInput) {
    username
  }
}
`; */
/* export const SIGN_UP_USER =  gql`
  mutation Mutation($addUserInput: newUserInput!) {
  addUser(input: $addUserInput) {
    username
  }
}
`; */
/* export const ADD_DATING = gql`
mutation Mutation($addDatingTextInput: newDTI) {
  addDatingText(input: $addDatingTextInput) {
    username
  }
}
`; */
export const LOGIN_USER = gql`
  mutation Mutation($logInEmail: String, $logInPassword: String) {
    logIn(email: $logInEmail, password: $logInPassword) {
      _id
      username
      firstName
      lastName
      email
      rank
      avatar
      loggedIn
      token
    }
  }
`;

export const LOGOUT_USER = gql`
  mutation Mutation {
    logOut
  }
`;

export const SIGN_UP_USER = gql`
  mutation Mutation($addUserUser: newUserInput!) {
    addUser(user: $addUserUser) {
      token
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUserProfileMutation($updateUserProfileUser: updateUserInput!) {
    updateUserProfile(user: $updateUserProfileUser) {
      _id
      username
      firstName
      lastName
      birthday
      email
      password
      rank
      avatar
    }
  }
`;

export const ADD_DATING = gql`
  mutation Mutation($addDatingTextText: newDTI) {
    addDatingText(text: $addDatingTextText) {
      text
      postDate
      xprivate
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation AddCommentMutation($addCommentComment: newComment) {
    addComment(comment: $addCommentComment) {
      text
    }
  }
`;

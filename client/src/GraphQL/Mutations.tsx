import { gql, useQuery } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation Mutation($logInEmail: String, $logInPassword: String) {
    logIn(email: $logInEmail, password: $logInPassword) {
      _id
      username
      firstName
      lastName
      birthday
      email
      password
      rank
      loggedIn
      datingTexts {
        _id
        owner {
          username
        }
        text
        score
        postDate
        display
        private
        comments {
          text
          postDate
          owner {
            username
          }
          onText {
            owner {
              username
            }
            text
          }
        }
      }
      # datingTexts {
      #   _id
      #   text
      #   score
      #   owner {
      #     _id
      #     username
      #   }
      #   postDate
      #   comments {
      #     text
      #     postDate
      #     owner {
      #       username
      #     }
      #     text
      #     postDate
      #   }
      # }
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
      username
      firstName
      lastName
      email
      password
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
      # avatar
      token
    }
  }
`;

export const ADD_DATING = gql`
  mutation Mutation($addDatingTextText: newDTI!) {
    addDatingText(text: $addDatingTextText) {
      text
      postDate
      private
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation Mutation($addCommentComment: newComment) {
    addComment(comment: $addCommentComment) {
      text
      onText {
        text
      }
    }
  }
`;

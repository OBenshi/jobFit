import { gql, useQuery } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation Mutation($logInInput: logInInput) {
  logIn(input: $logInInput) {
    username
  }
}
`;
export const SIGN_UP_USER =  gql`
  mutation Mutation($addUserInput: newUserInput!) {
  addUser(input: $addUserInput) {
    username
  }
}
`; 
  
export const ADD_DATING = gql`
mutation Mutation($addDatingTextInput: newDTI) {
  addDatingText(input: $addDatingTextInput) {
    username
  }
}
`;

export const ADD_COMMENT = gql`
query Query($aCommentId: ObjectID) {
  aComment(_id: $aCommentId) {
    text
  }
}
`; 

//*Good morning dearest Nathalia,
// if you are writing comments meant for me to read it would be better if you
// would use anchor comments with any workspace scope
// tag(TODO,REVIEW,FIXME,LINK,SECTION/!SECTION).
// Like this:

// REVIEW: mutation for login, 1. wrote for now "user" but it should be name of the
// route from the back end. at the end I am returning only email//

// if we combine it with the better comments extension behavior we could even
// make it colorful(and more A.D.D friendly...) by adding */!/? like this:

//* Nathalia is awesome
//! WARNING Nathalia is too awesome
//? can anyone be as awesome as Nathalia?

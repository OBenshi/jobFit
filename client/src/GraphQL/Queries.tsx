import { gql } from "@apollo/client";

export const DATING_TEXT = gql`
  query Query {
    allTexts {
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
        owner{
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
  }
`;

export const TONE_OF_TEXT = gql`
  query Query($aToneText: String!) {
    aTone(text: $aToneText)
  }
`;

export const USER = gql`
  query Query($userId: ObjectID) {
    user(_id: $userId) {
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
        text
        score
        owner {
          _id
          username
        }
        postDate
        comments {
          owner {
            username
          }
          text
          postDate
        }
      }
      token
    }
  }
`;

export const SEARCH_TEXT = gql`
  query Query($searchTextSearchTerm: String!) {
    searchText(searchTerm: $searchTextSearchTerm) {
      _id
      owner {
        username
      }
      text
      score
      postDate
      comments {
        owner {
          username
        }
        text
        postDate
      }
      display
      private
    }
  }
`;

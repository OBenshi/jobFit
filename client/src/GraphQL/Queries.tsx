import { gql } from '@apollo/client';

export const DATING_TEXT = gql`
query Query {
  allTexts {
    _id
    owner
    text
    score
    postDate
    display
    private
  }
}
`;

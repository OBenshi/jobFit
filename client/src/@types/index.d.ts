interface Props {
  allText:DatingText
}
interface DatingText {
  text: string,
  postDate: Date,
  score: number,
  private: boolean,
  display: boolean,
  comments: Comments,
  owner: Owner
}
interface Comment {
  text: string
}
type Comments = Comment[]
interface Owner {
  username: string
}
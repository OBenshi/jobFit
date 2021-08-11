interface Props {
  allText: DatingText;
}
interface DatingText {
  text: string;
  postDate: Date;
  score: number;
  private: boolean;
  display: boolean;
  comments: Comments;
  owner: Owner;
}
interface Comment {
  text: string;
  owner: string;
  date: Date;
}
type Comments = Comment[];
interface Owner {
  username: string;
}

namespace toolsNs {
  interface error {
    code: number;
    msg: string;
  }
}

namespace userNs {
  interface userProfile {
    _id: ObjectId;
    username: string;
    firstName: string;
    lastName: string;
    birthday: string;
    email: string;
    password: string;
    rank: number;
    // avatar?: string;
    loggedIn: boolean;
    datingTexts: Array<datingTextNs.datingText>;
    comments: Array<commentsNs.comment>;
  }
  interface updateProfile {
    //   _id: ObjectId;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    // avatar?: string;
  }
}
namespace auth {
  interface IAuthContext {
    isAuthenticated: boolean;
    user: userProfile | null;
    setUser: React.Dispatch<React.SetStateAction<userProfile | null>>;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  }
}
interface SignUp {
  firstName: string,
  lastName: string,
  username: string,
  password: string,
  birthday: string,
  email: string,
}
interface FormData {
  password: string;
  email: string;
}
// interface Dic {
//   [key: string | number]: object_type;
// }

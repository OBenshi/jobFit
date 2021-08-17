interface Props {
  allText: DatingText;
}
interface IAddText {
  // owner: ObjectId;
  text: string;
  postDate: string;
  display: boolean;
  xprivate: boolean;
}
interface DatingText {
  text: string;
  postDate: Date;
  score: number;
  private: boolean;
  display: boolean;
  comments: Comments;
  owner: Owner;
  _id: ObjectId
}
interface Comment {
  text: string;
  date: Date;
  score: number;
  onText: ObjectID;
  display: boolean;
  postDate: Date;
  owner:AnotherOwner
}
interface AnotherOwner {
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
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  birthday: string;
  email: string;
}
interface FormData {
  password: string;
  email: string;
}
// interface Dic {
//   [key: string | number]: object_type;
// }

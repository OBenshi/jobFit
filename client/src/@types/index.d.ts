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

///TODO please Oded change the your types so they look like mine. Here you do not have to export anything, just write your interfaces. I had to comment yours because my views were not compiling because of this file.

/* import { datingTextNs, commentsNs } from "../../../server/src/@types";

export namespace toolsNs {
  interface error {
    code: number;
    msg: string;
  }
}

export namespace userNs {
  interface userProfile {
    _id: ObjectId;
    username: string;
    firstName: string;
    lastName: string;
    birthday: string;
    email: string;
    password: string;
    rank: number;
    avatar?: string;
    loggedIn: boolean;
    datingTexts: Array<datingTextNs.datingText>;
    comments: Array<commentsNs.comment>;
  }
  interface updateProfile {
    //   _id: ObjectId;
    username: string;
    firstName: string;
    lastName: string;
    //   birthday: string;
    email: string;
    password: string;
    //   rank: number;
    avatar?: string;
    //   loggedIn: boolean;
    //   datingTexts: Array<datingTextNs.datingText>;
    //   comments: Array<commentsNs.comment>;
  }
}
export namespace auth {
  interface IAuthContext {
    isAuthenticated: boolean;
    user: userProfile | null;
    setUser: React.Dispatch<React.SetStateAction<userProfile | null>>;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  }
}
 */
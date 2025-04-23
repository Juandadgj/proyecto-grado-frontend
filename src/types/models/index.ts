
export interface IUser {
  id: string;
  name: string;
  lastName: string;
  phone?: string;
  email: string;
  password: string;
  role?: string;
  status?: boolean;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
  Rating: IRating[];
}

export interface ITopic {
  id: string;
  name: string;
  activities: IActivity[];
}

export interface IActivity {
  id: string;
  name: string;
  type: string;
  topicId?: string;
  topic?: ITopic;
  Rating: IRating[];
}

export interface IRating {
  id: string;
  userId: string;
  user?: IUser;
  score: number;
  game: string;

}

export interface IStory {
  id: string;
  title: string;
  content: string;
  images: string[];
}

export interface IAnswers {
  id: string;
  answer: string;
}

export interface IQuestion {
  id: number;
  question: string;
  answers: IAnswers[];
}

export interface IQuiz {
  id: string;
  question: IQuestion[];
  Rating: IRating[];
}

export interface ILoginFormData {
  emailOrStudentCode: string;
  password: string;
}

export interface IRegisterFormData {
  username: string;
  email: string;
  password: string;
}

export interface IAuthResponse {
  accessToken?: string;
}

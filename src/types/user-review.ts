import {User} from './user.ts';

type UserReview = {
  id: string;
  date: string;
  user: User;
  comment: string;
  rating: number;
}

export default UserReview;

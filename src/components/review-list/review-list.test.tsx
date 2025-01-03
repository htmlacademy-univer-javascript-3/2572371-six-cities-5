import { render, screen } from '@testing-library/react';
import { ReviewList } from './review-list';
import UserReview from '../../types/user-review';

const mockReviews: UserReview[] = [
  {
    id: '1',
    user: {
      name: 'Иван',
      avatarUrl: 'иванфотка',
      isPro: true,
    },
    rating: 4,
    comment: 'норм',
    date: '2023-10-01',
  },
  {
    id: '2',
    user: {
      name: 'Абоба',
      avatarUrl: 'абобафотка',
      isPro: false,
    },
    rating: 5,
    comment: 'круто',
    date: '2023-10-02',
  },
];

describe('ReviewList component', () => {
  it('renders a list of reviews correctly', () => {
    render(<ReviewList reviews={mockReviews} />);

    expect(screen.getByText('Иван')).toBeInTheDocument();
    expect(screen.getByText('норм')).toBeInTheDocument();
    expect(screen.getByText('Абоба')).toBeInTheDocument();
    expect(screen.getByText('круто')).toBeInTheDocument();
  });
});

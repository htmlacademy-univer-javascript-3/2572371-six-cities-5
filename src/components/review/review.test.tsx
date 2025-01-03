import { render, screen } from '@testing-library/react';
import Review from './review';
import UserReview from '../../types/user-review';

const mockReview: UserReview = {
  id: '1',
  user: {
    name: 'John Doe',
    avatarUrl: 'https://example.com/avatar.jpg',
    isPro: true,
  },
  rating: 4,
  comment: 'Great place!',
  date: '2023-10-01',
};

describe('Review component', () => {
  it('renders review correctly', () => {
    render(<Review review={mockReview} />);

    expect(screen.getByAltText(/Reviews avatar/i)).toHaveAttribute('src', mockReview.user.avatarUrl);
    expect(screen.getByText(mockReview.user.name)).toBeInTheDocument();
    expect(screen.getByText(mockReview.comment)).toBeInTheDocument();
    expect(screen.getByText(/Rating/i)).toBeInTheDocument();
  });
});

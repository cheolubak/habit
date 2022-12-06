import { User } from './user.entity';

describe('UserEntity', () => {
  it('Generate UserEntity', () => {
    const user = new User({
      profile: '/empty-profile.jpg',
      uid: 'OXYDrTsA6vTu8YhsUjRqFBPOCAu1',
      email: 'test@test.com',
      nickname: 'TESTER',
    });
    expect(user).toEqual({
      profile: '/empty-profile.jpg',
      uid: 'OXYDrTsA6vTu8YhsUjRqFBPOCAu1',
      email: 'test@test.com',
      nickname: 'TESTER',
    });
  });
});

import {
  getAuthToken,
  removeAuthToken,
  setAuthToken
} from '@/helpers/token-helpers';

describe('token helpers tests', () => {
  it('should add and remove token', () => {
    const mockToken = '12345-6789-0123';
    let token = getAuthToken();

    expect(token).toBe(null);

    setAuthToken(mockToken);

    token = getAuthToken();

    expect(token).toBe(mockToken);

    removeAuthToken();

    token = getAuthToken();

    expect(token).toBe(null);
  });
});

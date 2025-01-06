const dummyToken = {
  name: 'Dummy User',
  email: 'dummy@example.com',
  picture: 'https://dummy-profile-pic.com/image.jpg',
  sub: 'dummy-user-id-123',
  accessToken: 'dummy-access-token-12345',
  iat: Math.floor(Date.now() / 1000),
  exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60, // 24 hours from now
  jti: 'dummy-jwt-id-789',
};

const dummyAccount = {
  provider: 'google',
  type: 'oauth',
  providerAccountId: 'dummy-provider-account-id',
  access_token: 'dummy-access-token-12345',
  expires_at: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
  scope: 'openid profile email',
  token_type: 'Bearer',
  id_token: 'dummy-id-token-abcdef',
};

const mockCallbacks = {
  async jwt({ token = dummyToken, account = dummyAccount }) {
    if (account) {
      token.accessToken = 'dummy-access-token-12345';
    }
    return token;
  },
  async session({ session, token = dummyToken }) {
    return {
      ...session,
      accessToken: token.accessToken,
      user: {
        ...session.user,
        id: token.sub,
      },
    };
  },
  async redirect() {
    return '/dashboard';
  },
};

const mockAuth = {
  handlers: {
    GET: jest.fn((req, res) =>
      Promise.resolve(res.status(200).json({ status: 'ok' }))
    ),
    POST: jest.fn((req, res) =>
      Promise.resolve(res.status(200).json({ status: 'ok' }))
    ),
  },
  signIn: jest.fn(() =>
    Promise.resolve({
      ok: true,
      error: null,
      url: '/dashboard',
    })
  ),
  signOut: jest.fn(() =>
    Promise.resolve({
      ok: true,
      url: '/',
    })
  ),
  auth: jest.fn(() =>
    Promise.resolve({
      user: {
        id: 'dummy-user-id',
        name: 'Dummy User',
        email: 'dummy@example.com',
        image: 'https://dummy-profile-pic.com/image.jpg',
      },
      token: dummyToken,
      ...mockCallbacks,
    })
  ),
};

export const { handlers, signIn, signOut, auth } = mockAuth;

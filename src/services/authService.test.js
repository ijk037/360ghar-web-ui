import { beforeEach, describe, expect, it, vi } from 'vitest';

const ensureSupabaseClient = vi.fn();
const apiGet = vi.fn();

vi.mock('./supabaseClient', () => ({ ensureSupabaseClient }));
vi.mock('./api', () => ({
  default: { get: apiGet },
  publicApi: {},
}));
vi.mock('./lastAuthMethod', () => ({
  setLastAuthMethod: vi.fn(),
  AUTH_METHODS: {
    EMAIL_PASSWORD: 'email_password',
    PHONE_PASSWORD: 'phone_password',
  },
}));

async function loadAuthService() {
  const module = await import('./authService');
  return module.authService;
}

const SESSION = {
  access_token: 'tok',
  refresh_token: 'r',
  expires_in: 3600,
  token_type: 'bearer',
};
const fakeClient = () => ({
  auth: {
    signInWithPassword: vi.fn().mockResolvedValue({ data: { session: SESSION }, error: null }),
  },
});

describe('authService.login', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
  });

  it('returns user: null (does not throw) when the profile is missing (401)', async () => {
    ensureSupabaseClient.mockResolvedValue(fakeClient());
    apiGet.mockRejectedValue({ response: { status: 401 } });

    const authService = await loadAuthService();
    const result = await authService.login('9999999999', 'password');

    expect(result).toMatchObject({ access_token: 'tok', user: null });
  });

  it('returns user: null when the profile is missing (404)', async () => {
    ensureSupabaseClient.mockResolvedValue(fakeClient());
    apiGet.mockRejectedValue({ response: { status: 404 } });

    const authService = await loadAuthService();
    const result = await authService.login('9999999999', 'password');

    expect(result).toMatchObject({ access_token: 'tok', user: null });
  });

  it('returns the profile when it exists', async () => {
    ensureSupabaseClient.mockResolvedValue(fakeClient());
    apiGet.mockResolvedValue({ data: { id: 'u1', phone: '+919999999999' } });

    const authService = await loadAuthService();
    const result = await authService.login('9999999999', 'password');

    expect(result).toMatchObject({ access_token: 'tok', user: { id: 'u1' } });
  });

  it('still throws on a genuine (non-401/404) profile error', async () => {
    ensureSupabaseClient.mockResolvedValue(fakeClient());
    apiGet.mockRejectedValue({ response: { status: 500 } });

    const authService = await loadAuthService();
    await expect(authService.login('9999999999', 'password')).rejects.toBeDefined();
  });
});

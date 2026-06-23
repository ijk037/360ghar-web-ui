/// Map the backend auth-gate stage to a redirect path.
///
/// Stages come from the `/users/me/auth-state?app=ghar360` endpoint and are
/// cached on the auth store as `authStage`. Shared by LoginRegister,
/// ProfileCompletion, and the ProfileCompletionRouteGuard so the stage->path
/// mapping has a single source of truth.
///
/// Returns '/' for 'active' or unknown stages.
export const getRedirectPathForStage = (stage) => {
  switch (stage) {
    case 'identifier_verification':
      // Shouldn't happen post-login — send to login.
      return '/login';
    case 'password_setup':
      // Password is set inline in the login flow; post-login go to home.
      return '/';
    case 'profile_completion':
      return '/profile-completion';
    case 'app_onboarding':
      // Frontend has no dedicated onboarding page yet — go to home.
      return '/';
    case 'active':
    default:
      return '/';
  }
};

/// Fetch the current auth-gate stage from the backend, defaulting to 'active'
/// on failure so a backend hiccup never locks a user out of the app.
///
/// Accepts an optional axios request-config (e.g. to pass SKIP_AUTH_RETRY and a
/// shorter timeout for the fresh-sign-in path, where a 401 means "no profile
/// row" rather than "token expired" and the refresh+retry cycle only adds
/// latency).
export const fetchAuthStage = async (apiClient, requestConfig) => {
  try {
    const { data } = await apiClient.get('/users/me/auth-state?app=ghar360', requestConfig);
    return data?.stage || 'active';
  } catch {
    return 'active';
  }
};

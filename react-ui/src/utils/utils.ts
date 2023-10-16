// source – Jarod
// https://stackoverflow.com/questions/38235715/fetch-reject-promise-and-catch-the-error-if-status-is-not-ok

export const fetcher = async <T>(input: RequestInfo, init?: RequestInit) => {
  const path = (window as any).CLIENT_ENV === "development" ? `http://localhost:8080` : '';
  const response = await fetch(`${path}${input}`, init);

  if (!response.ok) {
    throw response;
  }

  return response.json() as Promise<T>;
};

export const setClientEnvironment = () => {
  if (window.location.hostname === "localhost") {
    return "development";
  }
  return "production";
};

export const generateRandomString = () => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}
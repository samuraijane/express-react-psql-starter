// source – Jarod
// https://stackoverflow.com/questions/38235715/fetch-reject-promise-and-catch-the-error-if-status-is-not-ok

export const fetcher = async <T>(input: RequestInfo, init?: RequestInit) => {
  const response = await fetch(input, init);

  if (!response.ok) {
    throw response;
  }

  return response.json() as Promise<T>;
};

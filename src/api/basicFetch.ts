const key = import.meta.env.TMDB_API_KEY;

export const basicFetch = async (
  method: "GET" | "POST",
  url: string,
  payload?: string
) => {
  return await fetch(url, {
    method: method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: payload,
  });
};

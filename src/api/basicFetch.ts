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
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMTg5MmM5MDZkMTI1N2JkYzk0OTk5ZTI0YzdiMDZjYSIsIm5iZiI6MTcyMDQ3MTExNC44ODg2ODMsInN1YiI6IjY2OGM0YzU2ZTAzYjYxNGFjYWRkM2I0MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BSKFzHELSifpureJsoPmn5eJPKR3ndwOwTQ5U11MKBs",
    },
    body: payload,
  });
};

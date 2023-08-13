const API =  "https://api.themoviedb.org/3";

export function get(path) {
  return fetch(API + path, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZWUwY2E1OTE4MjNkMzBmYzQ2YzFjM2RkYjgzMTAyMSIsInN1YiI6IjYzYWQwMzZhYmU0YjM2MDBkNzNlZDIxZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bWKDT8_SWReuq0s3fhCSI5NaxetS8zQ7ty9Dvv4MeUk",
      "Content-Type": "aplication/json;charset=utf-8",
    },
  }).then((result) => result.json());
}

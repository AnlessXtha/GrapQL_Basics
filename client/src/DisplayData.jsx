import React, { useState } from "react";
import { useQuery, useLazyQuery, gql, useMutation } from "@apollo/client";

const QUERY_ALL_USERS = gql`
  query GetAllUsers {
    users {
      id
      name
      age
      username
      nationality
    }
  }
`;

const QUERY_ALL_MOVIES = gql`
  query GetAllMovies {
    movies {
      name
    }
  }
`;

const GET_MOVIE_BY_NAME = gql`
  query Movie($name: String!) {
    movie(name: $name) {
      name
      yearOfPublication
    }
  }
`;

const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      name
      id
    }
  }
`;

const DELETE_USER_MUTATION = gql`
  mutation DeleteUser($deleteUserId: ID!) {
    deleteUser(id: $deleteUserId) {
      id
    }
  }
`;

function DisplayData() {
  const [movieSearched, setMovieSearched] = useState("");

  //Create user state(make it in one)
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [nationality, setNationality] = useState("");

  // Delete a user
  const [userId, setUserId] = useState();

  const { data, loading, refetch } = useQuery(QUERY_ALL_USERS);
  const { data: movieData } = useQuery(QUERY_ALL_MOVIES);
  const [fetchMovie, { data: movieSearchData, error: movieSearchError }] =
    useLazyQuery(GET_MOVIE_BY_NAME);

  const [createUser] = useMutation(CREATE_USER_MUTATION);
  const [deleteUser] = useMutation(DELETE_USER_MUTATION);

  if (loading) {
    return <h1>DATA IS LOADING...</h1>;
  }

  if (data) {
    console.log(data);
  }

  return (
    <div>
      {/* Create a user */}
      <div>
        <h1>Create a User</h1>
        <hr />
        <input
          type="text"
          placeholder="Name..."
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Username..."
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <input
          type="number"
          placeholder="Age..."
          onChange={(event) => {
            setAge(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Nationality..."
          onChange={(event) => {
            setNationality(event.target.value.toUpperCase());
          }}
        />
        <button
          onClick={() => {
            createUser({
              variables: {
                input: { name, username, age: Number(age), nationality },
              },
            });

            refetch();
          }}
        >
          Create User
        </button>
      </div>

      {/* Delete a user */}
      <div>
        <h1>Delete a User</h1>
        <input
          type="text"
          placeholder="user id"
          // value={userId}
          onChange={(event) => {
            setUserId(event.target.value);
          }}
        />
        <button
          onClick={() => {
            deleteUser({
              variables: {
                deleteUserId: Number(userId),
              },
            });
            refetch();
            console.log(userId);
          }}
        >
          Delete User
        </button>
      </div>

      {data &&
        data.users.map((user) => {
          return (
            <div>
              <h1>User ID: {user.id}</h1>
              <h1>Name: {user.name}</h1>
              <h1>Username: {user.username}</h1>
              <h1>Age: {user.age}</h1>
              <h1>Nationality: {user.nationality}</h1>
              <hr />
            </div>
          );
        })}
      {movieData &&
        movieData.movies.map((movie) => {
          return <h1>Movie Name: {movie.name}</h1>;
        })}
      <div>
        <input
          type="text"
          placeholder="Interstellar..."
          onChange={(event) => {
            setMovieSearched(event.target.value);
          }}
        />
        <button
          onClick={() => {
            fetchMovie({
              variables: {
                name: movieSearched,
              },
            });
          }}
        >
          Fetch Data
        </button>
        <div>
          {movieSearchData && (
            <div>
              <h1>Movie Name: {movieSearchData.movie.name}</h1>
              <h1>
                Year of Publication: {movieSearchData.movie.yearOfPublication}
              </h1>
            </div>
          )}
          {movieSearchError && <h1>There was an error fetching the data.</h1>}
        </div>
      </div>
    </div>
  );
}

export default DisplayData;

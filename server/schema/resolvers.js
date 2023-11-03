const { UserList, MovieList } = require("../FakeDate");
const _ = require("lodash");

const resolvers = {
  Query: {
    // USER RESOLVERS
    users: (parent, args, context) => {
      // console.log(context);
      return UserList;
    },

    user: (parent, args, context, info) => {
      const id = args.id;
      const user = _.find(UserList, { id: Number(id) });
      return user;
    },

    // MOVIE RESOLVERS
    movies: () => {
      return MovieList;
    },

    movie: (parent, args) => {
      const name = args.name;
      const movie = _.find(MovieList, { name });
      return movie;
    },
  },

  User: {
    favoriteMovies: (parent) => {
      // console.log(parent);

      return _.filter(
        MovieList,
        (movie) =>
          movie.yearOfPublication >= 2000 && movie.yearOfPublication <= 2010
      );

      // Alternate way

      //   return MovieList.filter(
      //     (movie) =>
      //       movie.yearOfPublication >= 2000 && movie.yearOfPublication <= 2010
      //   );

      // Alternate way

      //   return MovieList.filter((movie) => {
      //     return (
      //       movie.yearOfPublication >= 2000 && movie.yearOfPublication <= 2010
      //     );
      //   });
    },
  },

  Mutation: {
    createUser: (parent, args) => {
      const user = args.input;
      const lastId = UserList[UserList.length - 1].id;
      user.id = lastId + 1;
      UserList.push(user);
      return user;
    },

    updateUsername: (parent, args) => {
      const { id, newUsername } = args.input;
      // console.log(id, newUsername);

      let userUpdated;
      UserList.forEach((user) => {
        if (user.id === Number(id)) {
          user.username = newUsername;
          userUpdated = user;
        }
      });
      return userUpdated;

      // Alternative way
      // const user = UserList.find((user) => user.id === Number(id));
      // if (user) {
      //   user.username = newUsername;
      //   return user;
      // } else {
      //   throw new Error("User not found");
      // }
    },

    deleteUser: (parent, args) => {
      const id = args.id;
      _.remove(UserList, (user) => user.id === Number(id));
      return null;
    },
  },
};

module.exports = { resolvers };

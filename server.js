import { ApolloServer, gql } from 'apollo-server';

const typeDefs = gql`
  type Query {
    allMovies: [Movie!]!
    movie(id: String!): Movie
  }
  type Movie {
    id: Int
    url: String
    imdb_code: String
    title: String
    title_english: String
    title_long: String
    slug: String
    year: Int
    rating: Float
    runtime: Int
    genres: [String]
    summary: String
    description_full: String
    synopsis: String
    yt_trailer_code: String
    language: String
    mpa_rating: String
    background_image: String
    background_image_original: String
    small_cover_image: String
    medium_cover_image: String
    large_cover_image: String
    state: String
    torrents: [String]
    date_uploaded: String
    date_uploaded_unix: Int
  }
`;

const resolvers = {
  Query: {
    allMovies() {
      return fetch('https://yts.mx/api/v2/list_movies.json')
        .then(res => res.json())
        .then(json => json.data.movies);
    },
    movie(_, { id }) {
      return fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
        .then(res => res.json())
        .then(json => json.data.movie);
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => console.log(url));

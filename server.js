import { ApolloServer, gql } from 'apollo-server';

const typeDefs = gql`
  type Query {
    tickers: [Ticker]!
    ticker(id: String!): Ticker
    coins: [Coin]
    coin(id: String!): Coin
  }
  type Ticker {
    id: String
    name: String
    symbol: String
    rank: Int
    circulating_supply: Int
    total_supply: Int
    max_supply: Int
    beta_value: Float
    first_data_at: String
    last_updated: String
  }
  type Ticker {
    id: String
    name: String
    symbol: String
    rank: Int
    circulating_supply: Int
    total_supply: Int
    max_supply: Int
    beta_value: Float
    first_data_at: String
    last_updated: String
    Quote(key: String): [Quote]
  }
  type Quote {
    price: Float
    volume_24h: Float
    volume_24h_change_24h: Float
    market_cap: Int
    market_cap_change_24h: Float
    percent_change_15m: Float
    percent_change_30m: Float
    percent_change_1h: Float
    percent_change_6h: Float
    percent_change_12h: Float
    percent_change_24h: Float
    percent_change_7d: Float
    percent_change_30d: Float
    percent_change_1y: Float
    ath_price: Float
    ath_date: String
    percent_from_price_ath: Float
  }
  type Coin {
    id: String
    name: String
    symbol: String
    rank: Int
    is_new: Boolean
    is_active: Boolean
    type: String
  }
`;

const resolvers = {
  Query: {
    tickers() {
      return fetch('https://api.coinpaprika.com/v1//ticker')
        .then(res => res.json())
        .then(json => json.slice(0, 100));
    },
    ticker(_, { id }) {
      return fetch(`https://api.coinpaprika.com/v1//tickers/${id}`).then(res => res.json());
    },
    coins() {
      return fetch('https://api.coinpaprika.com/v1//coins')
        .then(res => res.json())
        .then(json => json.slice(0, 100));
    },
    coin(_, { id }) {
      return fetch(`https://api.coinpaprika.com/v1//coins/${id}`).then(res => res.json());
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀 Server listening at: ${url}`);
});

import { ApolloServer, gql } from 'apollo-server';

const typeDefs = gql`
  type Query {
    tickers: [Ticker]!
    coins: [Coins]
    coin(id: String!): Coin
    ohlcv(id: String!): [Ohlcv]
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
    quotes: Quotes
  }
  type Quotes {
    USD: Quote
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
  type Coins {
    id: String
    name: String
    symbol: String
    rank: Int
    is_new: Boolean
    is_active: Boolean
    type: String
  }
  type Coin {
    id: String
    name: String
    symbol: String
    rank: Int
    is_new: Boolean
    is_active: Boolean
    type: String
    logo: String
    tags: Tags
    description: String
    message: String
    open_source: Boolean
    hardware_wallet: Boolean
    started_at: String
    development_status: String
    proof_type: String
    org_structure: String
    hash_algorithm: String
    contract: String
    platform: String
    first_data_at: String
    last_data_at: String
  }
  type Tags {
    tag: [Tag]
  }
  type Tag {
    id: String
    name: String
  }
  type Ohlcv {
    time_open: Int
    time_close: Int
    open: String
    high: String
    low: String
    close: String
    volume: String
    market_cap: Int
  }
`;

const resolvers = {
  Query: {
    tickers() {
      return fetch('https://api.coinpaprika.com/v1/ticker')
        .then(res => res.json())
        .then(json => json.slice(0, 100));
    },
    coins() {
      return fetch('https://api.coinpaprika.com/v1/coins')
        .then(res => res.json())
        .then(json => json.slice(0, 100));
    },
    coin(_, { id }) {
      return fetch(`https://api.coinpaprika.com/v1/coins/${id}`).then(res => res.json());
    },
    ohlcv(_, { id }) {
      return fetch(`https://ohlcv-api.nomadcoders.workers.dev?coinId=${id}`).then(res => res.json());
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀 Server listening at: ${url}`);
});

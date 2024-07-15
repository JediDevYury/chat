import {ApolloDriver, ApolloDriverConfig} from "@nestjs/apollo";
import {ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import {schemeTransformer} from "../graphql/transformers";

export const apolloDriverConfig: ApolloDriverConfig = {
  driver: ApolloDriver,
  typePaths: ['./src/graphql/**/*.graphql'],
  playground: false,
  plugins: [
    ApolloServerPluginLandingPageLocalDefault(),
  ],
  transformSchema: async (schema) => schemeTransformer(schema, 'authenticated'),
  context: ({req, res}) => ({req, res}),
}

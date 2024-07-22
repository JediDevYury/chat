import {ApolloDriver, ApolloDriverConfig} from "@nestjs/apollo";
import {ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import {schemeTransformer} from "../graphql/transformers";
import {formatError} from "../helpers";

export const apolloDriverConfig: ApolloDriverConfig = {
  driver: ApolloDriver,
  typePaths: ['./src/graphql/**/*.graphql'],
  playground: false,
  formatError,
  includeStacktraceInErrorResponses: false,
  plugins: [
    ApolloServerPluginLandingPageLocalDefault(),
  ],
  buildSchemaOptions: {
    dateScalarMode: 'isoDate',
  },
  transformSchema: async (schema) => schemeTransformer(schema, 'authenticated'),
  context: ({req, res}) => ({req, res}),
}

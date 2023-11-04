import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { join } from 'path';

export const GraphqlConfig: ApolloDriverConfig = {
  driver: ApolloDriver,
  autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
  sortSchema: true,
  playground: false,
  path: '/api/v1',
  // playground: {
  //   settings: { 'request.credentials': 'include' },
  // },
  plugins: [ApolloServerPluginLandingPageLocalDefault()],
  includeStacktraceInErrorResponses: false,
  formatError: (err) => {
    return {
      message: err.message,
      errors: err.extensions.originalError,
    };
  },
};

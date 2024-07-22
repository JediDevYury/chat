import QueryRepresentations from '../../src/graphql/query-string-representations';

export const generateBody = <T extends Record<string, any>>(name: string, variables?: T) => {
   return {
     query: QueryRepresentations[name],
     variables,
   }
}

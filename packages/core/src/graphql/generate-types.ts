import {GraphQLDefinitionsFactory} from '@nestjs/graphql';
import {join} from 'path';

export const definitionsFactory = new GraphQLDefinitionsFactory();

async function generateTypes() {
  try {
    await definitionsFactory.generate({
      typePaths: ['./**/*.graphql'],
      path: join(process.cwd(), 'src/graphql/graphql.ts'),
      defaultTypeMapping: {
        ID: 'number',
      },
      outputAs: 'class',
      watch: true,
      skipResolverArgs: true,
    });
  } catch (e) {
    console.error(e);
  }
}

generateTypes();

import {Response} from "superagent";
import {expect} from '@jest/globals';

type Values = Record<string, any> | Record<string, any>[];

export const responseChecker = (query: string, values: Values) => {
  return (res: Response) => {
    if(!(query in res.body.data)) {
      throw new Error(`Query ${query} not found in response`);
    }

    expect(res.body.data[query]).toEqual(values);
  };
};

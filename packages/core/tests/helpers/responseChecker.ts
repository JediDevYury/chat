import {Response} from "superagent";
import {expect} from '@jest/globals';

type Values = Record<string, any> | Record<string, any>[];

export const responseChecker = (query: string, values: Values) => {
  return (res: Response) => {
    expect(res.body.data).toHaveProperty(query);
    expect(res.body.data[query]).toEqual(values);
  };
};

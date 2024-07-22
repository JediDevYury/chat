import {Response} from 'supertest';

export const generateGqlError = (message: string, code: string, options: {
  withOriginalError?: boolean;
} = {
  withOriginalError: true,
}) => {
  const errors = [{
    ...options?.withOriginalError ? {
      code,
      message,
    }: {}
  }];

  return function(res: Response) {
    const body = res.body;

    return body.errors.every((error, index) => {
      expect(error).toEqual(errors[index]);
    });
  };
}

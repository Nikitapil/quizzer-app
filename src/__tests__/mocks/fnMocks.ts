export const errorFn = () => {
  throw {
    response: {
      data: {
        message: 'error'
      }
    }
  };
};

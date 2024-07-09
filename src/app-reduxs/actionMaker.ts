function makeActionCreator(type: any, ...argNames: (string | number)[]) {
  return function (...args: any[]) {
    const action = {type} as any;
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index];
    });
    return action;
  };
}

export default makeActionCreator;

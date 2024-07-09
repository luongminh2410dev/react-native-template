export const log = (...params: Array<unknown>) => {
  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-console
    console.log(...params);
  }
};

export const warn = (...params: Array<unknown>) => {
  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-console
    console.warn(...params);
  }
};

/**
 * A simple {@link Promise} timeout to give some delay
 *
 * @param ms The time to delay (in millisecond)
 */
export const wait = (ms: number) => new Promise(res => setTimeout(res, ms));

export const requestLog = async (
  method: string = "",
  url: string = "",
  data: any,
  type: "req" | "res" | "err",
) => {
  const tag = type === "req" || type === "res" ? method : "error";
  const colors = {
    req: "blue",
    res: "green",
    err: "red",
  };

  const icons = {
    req: ">>>",
    res: "<<<",
    err: "xxx",
  };

  if (type === "err") {
    log(
      `%c${icons[type]} [${tag.toUpperCase()}] | %c${url.toUpperCase()} \n`,
      `color: ${colors[type]}; font-weight: bold`,
      "color: violet; font-weight: bold",
      data.response,
    );
  } else {
    log(
      `%c${icons[type]} [${tag.toUpperCase()}] | %c${url.toUpperCase()} \n`,
      `color: ${colors[type]}; font-weight: bold`,
      "color: violet; font-weight: bold",
      data,
    );
  }
};

export type KeyValuePair<T = string> = {
  [key: string]: T | KeyValuePair<T>;
};

import { KeyValuePair } from "./KeyValuePair.type";

export type PackageJson = {
  [key: string]: string | KeyValuePair<string>;
  scripts: {
    [key: string]: string;
  };
};

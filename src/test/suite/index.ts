import * as globModule from "glob"; // Import the glob module
import Mocha from "mocha";
import * as path from "path";
import { promisify } from "util";

const globPromise = promisify(globModule.glob); // Access and promisify the glob function

export async function run(): Promise<void> {
  const mocha = new Mocha({
    ui: "tdd",
    color: true,
  });

  const testsRoot = path.resolve(__dirname, "..");

  try {
    const files: string[] = (await globPromise("**/**.test.js", {
      cwd: testsRoot,
    })) as string[]; // Explicitly cast the result to string[]

    // Add files to the test suite
    files.forEach((f: string) => mocha.addFile(path.resolve(testsRoot, f)));

    return new Promise((resolve, reject) => {
      try {
        // Run the mocha test
        mocha.run((failures: number) => {
          if (failures > 0) {
            reject(new Error(`${failures} tests failed.`));
          } else {
            resolve();
          }
        });
      } catch (err) {
        reject(err);
      }
    });
  } catch (err) {
    return Promise.reject(err);
  }
}

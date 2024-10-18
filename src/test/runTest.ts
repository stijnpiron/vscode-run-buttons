import { runTests } from "@vscode/test-electron";
import * as path from "path";

async function main() {
  try {
    const extensionDevelopmentPath = path.resolve(__dirname, "../../");
    const extensionTestsPath = path.resolve(__dirname, "./suite/index");

    console.log("Extension Development Path:", extensionDevelopmentPath);
    console.log("Extension Tests Path:", extensionTestsPath);

    await runTests({ extensionDevelopmentPath, extensionTestsPath });
  } catch (err) {
    console.error(err);
    console.error("Failed to run tests");
    process.exit(1);
  }
}

main();

import * as path from "path";
import { runTests } from "vscode-test";

async function main() {
  try {
    const extensionDevelopmentPath = path.resolve(__dirname, "../../../");
    const extensionTestsPath = path.resolve(__dirname, "./suite");

    await runTests({
      extensionDevelopmentPath,
      extensionTestsPath,
      version: "insiders",
    });
  } catch (err) {
    console.error("Failed to run tests", err);
    process.exit(1);
  }
}

main();
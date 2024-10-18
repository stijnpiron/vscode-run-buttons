import { runTests } from "@vscode/test-electron";
import * as path from "path";

async function main() {
  try {
    const extensionDevelopmentPath = path.resolve(__dirname, "../../../");
    const extensionTestsPath = path.resolve(__dirname, "./suite");

    console.log("Extension Development Path:", extensionDevelopmentPath);
    console.log("Extension Tests Path:", extensionTestsPath);

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

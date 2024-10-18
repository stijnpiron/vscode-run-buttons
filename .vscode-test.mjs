import { defineConfig } from "@vscode/test-cli";

export default defineConfig([
  {
    label: "unitTests",
    files: "out/test/**/*.test.js",
    workspaceFolder: "./sampleWorkspace",
    mocha: {
      ui: "tdd",
      timeout: 20000,
    },
    env: {
      DISPLAY: ":99",
    },
  },
]);

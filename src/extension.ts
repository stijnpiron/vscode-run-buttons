import { promises as fsPromises } from "fs";
import { commands, ExtensionContext, window, workspace } from "vscode";
import { KeyValuePair, PackageJson } from "./types";

const { readFile } = fsPromises;

export function activate(context: ExtensionContext) {
  const cwd = getWorkspaceFolderPath();

  function getWorkspaceFolderPath() {
    const workspaceFolder = workspace.workspaceFolders?.[0];
    const path = workspaceFolder?.uri.fsPath;
    console.log('getWorkspaceFolderPath',workspaceFolder,path);
    return path;
  }

  async function getJsonFile<T>(path: string) {
    const fileBuffer = await readFile(path);
    const data = JSON.parse(fileBuffer.toString()) as T;
    return data;
  }

  async function getPackageJson() {
    console.log('cwd:',cwd);
    const packageJson = await getJsonFile<PackageJson>(`${cwd}/package.json`);
    return packageJson;
  }

  /**
   * Execute commands through the VS Code terminal
   * @param {string} command The command to execute
   */
  function executeInTerminal(command: string) {
    // If there is already an open terminal, use it; otherwise, create a new terminal
    const terminal = window.createTerminal(command);
    // Show terminal
    terminal.show();
    // Send command to the terminal
    terminal.sendText(command);
  }

  async function init() {
    let scripts: KeyValuePair = {};
    // Register command and send npm start
    const npmStart = commands.registerCommand("npm.start", function () {
      executeInTerminal("npm start");
    });

    // Register command and send npm run test
    const npmTest = commands.registerCommand("npm.test", function () {
      executeInTerminal("npm run test");
    });

    // Register command and send npm run lint
    const npmLint = commands.registerCommand("npm.lint", function () {
      executeInTerminal("npm run lint");
    });

    // Register command and send npm run build
    const npmBuild = commands.registerCommand("npm.build", function () {
      executeInTerminal("npm run build");
    });

    // Add the command to context.subscriptions
    context.subscriptions.push(npmStart, npmBuild, npmLint, npmTest);

    try {
      const packageJson = await getPackageJson();
      console.log("Loaded package.json!");
      scripts = { ...scripts, ...packageJson.scripts };
      console.log("all scripts", { scripts });
    } catch {
      console.log("No package.json found!");
    }
  }

  init();
}

export function deactivate() {}

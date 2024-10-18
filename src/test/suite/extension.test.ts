import assert from "assert";
import sinon from "sinon";
import { commands, ExtensionContext, window, workspace } from "vscode";
import { activate } from "../../extension";

suite("Extension Tests", () => {
  let sandbox: sinon.SinonSandbox;
  let context: ExtensionContext;

  setup(() => {
    sandbox = sinon.createSandbox();
    context = { subscriptions: [] } as unknown as ExtensionContext;
  });

  teardown(() => {
    sandbox.restore();
  });

  test("should register commands on activation", async () => {
    const registerCommandStub = sandbox.stub(commands, "registerCommand");
    const showTerminalStub = sandbox.stub(window, "createTerminal").returns({
      show: sandbox.stub(),
      sendText: sandbox.stub(),
      name: "mockTerminal",
      processId: Promise.resolve(1234),
      creationOptions: {},
      exitStatus: undefined,
      dispose: sandbox.stub(),
      hide: sandbox.stub(),
      state: { isInteractedWith: false },
      shellIntegration: undefined,
    });
    await activate(context);
    assert.strictEqual(registerCommandStub.callCount, 4);
    assert(registerCommandStub.calledWith("npm.start"));
    assert(registerCommandStub.calledWith("npm.test"));
    assert(registerCommandStub.calledWith("npm.lint"));
    assert(registerCommandStub.calledWith("npm.build"));
    showTerminalStub.restore();
  });
  test("should execute npm start command", async () => {
    const terminalMock = {
      show: sandbox.stub(),
      sendText: sandbox.stub(),
      name: "mockTerminal",
      processId: Promise.resolve(1234),
      creationOptions: {},
      exitStatus: undefined,
      dispose: sandbox.stub(),
      hide: sandbox.stub(),
      state: { isInteractedWith: false },
      shellIntegration: undefined,
    };

    const executeInTerminalStub = sandbox
      .stub(window, "createTerminal")
      .returns(terminalMock);

    await activate(context);
    await commands.executeCommand("npm.start");

    assert(executeInTerminalStub.calledOnce);
    assert(terminalMock.sendText.calledWith("npm start"));

    executeInTerminalStub.restore();
  });

  test("should execute npm test command", async () => {
    const terminalMock = {
      show: sandbox.stub(),
      sendText: sandbox.stub(),
      name: "mockTerminal",
      processId: Promise.resolve(1234),
      creationOptions: {},
      exitStatus: undefined,
      dispose: sandbox.stub(),
      hide: sandbox.stub(),
      state: { isInteractedWith: false },
      shellIntegration: undefined,
    };

    const executeInTerminalStub = sandbox
      .stub(window, "createTerminal")
      .returns(terminalMock);

    await activate(context);
    await commands.executeCommand("npm.test");

    assert(executeInTerminalStub.calledOnce);
    assert(terminalMock.sendText.calledWith("npm run test"));

    executeInTerminalStub.restore();
  });

  test("should execute npm lint command", async () => {
    const terminalMock = {
      show: sandbox.stub(),
      sendText: sandbox.stub(),
      name: "mockTerminal",
      processId: Promise.resolve(1234),
      creationOptions: {},
      exitStatus: undefined,
      dispose: sandbox.stub(),
      hide: sandbox.stub(),
      state: { isInteractedWith: false },
      shellIntegration: undefined,
    };

    const executeInTerminalStub = sandbox
      .stub(window, "createTerminal")
      .returns(terminalMock);

    await activate(context);
    await commands.executeCommand("npm.lint");

    assert(executeInTerminalStub.calledOnce);
    assert(terminalMock.sendText.calledWith("npm run lint"));

    executeInTerminalStub.restore();
  });

  test("should execute npm build command", async () => {
    const terminalMock = {
      show: sandbox.stub(),
      sendText: sandbox.stub(),
      name: "mockTerminal",
      processId: Promise.resolve(1234),
      creationOptions: {},
      exitStatus: undefined,
      dispose: sandbox.stub(),
      hide: sandbox.stub(),
      state: { isInteractedWith: false },
      shellIntegration: undefined,
    };

    const executeInTerminalStub = sandbox
      .stub(window, "createTerminal")
      .returns(terminalMock);

    await activate(context);
    await commands.executeCommand("npm.build");

    assert(executeInTerminalStub.calledOnce);
    assert(terminalMock.sendText.calledWith("npm run build"));

    executeInTerminalStub.restore();
  });

  test("should get workspace folder path", async () => {
    const workspaceFolder = { uri: { fsPath: "/path/to/workspace" } };
    sandbox.stub(workspace, "workspaceFolders").value([workspaceFolder]);

    await activate(context);

    assert.strictEqual(workspaceFolder.uri.fsPath, "/path/to/workspace");
  });
});

import assert from "assert";
import * as sinon from "sinon";
import { commands, ExtensionContext, window } from "vscode";
import { activate } from "../extension";

suite("Extension Tests", () => {
  let sandbox: sinon.SinonSandbox;
  let context: ExtensionContext;

  setup(() => {
    sandbox = sinon.createSandbox();
    context = {
      subscriptions: [],
    } as unknown as ExtensionContext;
  });

  teardown(() => {
    sandbox.restore();
  });

  test("should register commands on activation", async () => {
    console.log("Starting test: should register commands on activation");

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
    console.log("Completed test: should register commands on activation");
  });
});

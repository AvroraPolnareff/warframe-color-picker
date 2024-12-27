// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  eventsCausingActions: {};
  internalEvents: {
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {};
  missingImplementations: {
    actions: never;
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingServices: {};
  eventsCausingGuards: {};
  eventsCausingDelays: {};
  matchesStates:
    | "colorWindows"
    | "colorWindows.default"
    | "colorWindows.manual"
    | "colorWindows.hist"
    | "sharing"
    | "sharing.export"
    | "sharing.import"
    | "sharing.text"
    | {
        colorWindows?: "default" | "manual" | "hist";
        sharing?: "export" | "import" | "text";
      };
  tags: never;
}

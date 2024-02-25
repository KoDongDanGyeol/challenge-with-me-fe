export interface IDETypes {
  id: number
  solution: string
  testcaseTypes: {
    input: string[]
    expected: string
  }
  testcaseValues: {
    public: {
      input: string[]
      expected: string
    }[]
    userSaved: {
      input: string[]
      expected: string
    }[]
    userDraft: {
      input: string[]
      expected: string
    }[]
  }
}

export const IDEGridArea = {
  Leading: "leading",
  Challenge: "challenge",
  Editor: "editor",
  Result: "result",
  Trailing: "trailing",
} as const

export type IDEGridArea = (typeof IDEGridArea)[keyof typeof IDEGridArea]

export const IDESolutionResultType = {
  Ready: "ready",
  Run: "run",
  Submit: "submit",
} as const

export type IDESolutionResultType = (typeof IDESolutionResultType)[keyof typeof IDESolutionResultType]

export const IDESolutionResultStatus = {
  Wait: "wait",
  Cancel: "cancel",
  Complete: "complete",
} as const

export type IDESolutionResultStatus = (typeof IDESolutionResultStatus)[keyof typeof IDESolutionResultStatus]

export const IDESolutionInitialValue: { [key in string]: string } = {
  java: `import java.util.Scanner;

public class Solution {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    String a = sc.next();
  }
}`,
}

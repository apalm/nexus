import path from "path";
import * as Types from "./types";

export function prettierFormat(
  prettierConfig: string | object
): Types.FormatTypegenFn {
  return async function formatTypegen(
    content: string,
    type: "types" | "schema"
  ) {
    try {
      const prettier = require("prettier") as typeof import("prettier");
      if (typeof prettierConfig === "string") {
        if (!path.isAbsolute(prettierConfig)) {
          throw new Error(
            `Expected prettierrc path to be absolute, saw ${prettierConfig}`
          );
        }
        const fs = require("fs") as typeof import("fs");
        const util = require("util") as typeof import("util");
        const readFile = util.promisify(fs.readFile);
        prettierConfig = JSON.parse(await readFile(prettierConfig, "utf8"));
      }
      return prettier.format(content, {
        ...(prettierConfig as object),
        parser: type === "types" ? "typescript" : "graphql",
      });
    } catch (e) {
      console.error(e);
    }
    return content;
  };
}

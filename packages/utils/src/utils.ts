import minimatch from "minimatch";
import {
  TelescopeOptions,
  TelescopeOption,
  ProtoRef,
  ImportUsage,
} from "@cosmology/types";
import { ImportDeclaration } from "@babel/types";
import * as dotty from "dotty";

/**
 * swap the key and value of the input object
 * @param input obj needs to swap
 * @returns swapped obj
 */
export const swapKeyValue = (input: {
  [key: string]: string;
}): {
  [key: string]: string;
} => {
  const output: { [key: string]: string } = {};

  for (const key in input) {
    if (input.hasOwnProperty(key)) {
      output[input[key]] = key;
    }
  }

  return output;
};

const getAllPackageParts = (name: string, list?: string[]) => {
  if (!list) list = [name];
  const newParts = name.split(".");
  newParts.pop();
  if (!newParts.length) return [...list];
  const newName = newParts.join(".");
  return getAllPackageParts(newName, [...list, newName]);
};

export const getPluginValue = (
  optionName: TelescopeOption | string,
  currentPkg: string,
  options: TelescopeOptions
) => {
  const pkgOpts = options.packages;
  let value;
  if (currentPkg) {
    getAllPackageParts(currentPkg).some((pkg, i) => {
      if (dotty.exists(pkgOpts, pkg)) {
        const obj = dotty.get(pkgOpts, pkg);
        if (dotty.exists(obj, optionName)) {
          value = dotty.get(obj, optionName);
          return true;
        }
      }
    });
  }
  if (value === undefined) {
    const defaultValue = dotty.exists(options, optionName)
      ? dotty.get(options, optionName)
      : undefined;
    value = defaultValue;
  }
  return value;
};

export const getTypeNameFromFieldName = (
  name: string,
  importSrc: string,
  ref: ProtoRef
) => {
  let importedAs = name;
  const names = ref.traversed?.importNames;
  if (
    names &&
    names.hasOwnProperty(importSrc) &&
    names[importSrc].hasOwnProperty(name)
  ) {
    importedAs = names[importSrc][name];
  }

  return importedAs;
};

export const buildImports = (imports: ImportUsage[]) => {
  return imports.map((item) => {
    return {
      type: "ImportDeclaration",
      importKind: "value",
      specifiers: [
        {
          type: "ImportNamespaceSpecifier",
          local: {
            type: "Identifier",
            name: item.importedAs,
          },
        },
      ],
      source: {
        type: "StringLiteral",
        value: item.import,
      },
    };
  });
};

// https://github.com/isaacs/minimatch/blob/main/src/index.ts#L61
// Optimized checking for the most common glob patterns.
const globPattern = /\*+([^+@!?\*\[\(]*)/;

export const getServiceImplement = (
  serviceName:
    | "Msg"
    | "Query"
    | "Service"
    | "ReflectionService"
    | "ABCIApplication"
    | string,
  packagePath: string,
  methodName: string,
  serviceImplement?: {
    [
      key:
        | "Msg"
        | "Query"
        | "Service"
        | "ReflectionService"
        | "ABCIApplication"
        | string
    ]: {
      include?: {
        patterns?: string[];
      };
      type: "Query" | "Tx" | string;
    };
  }
) => {
  if (serviceImplement) {
    const implement = serviceImplement[serviceName];
    if (implement) {
      const methodNameWithPkg = `${packagePath}.${methodName}`;

      const isMatching =
        !implement.include?.patterns?.length ||
        implement.include.patterns.some((pattern) => {
          if (!globPattern.test(pattern)) {
            return methodNameWithPkg === pattern;
          }
          return minimatch(methodNameWithPkg, pattern);
        });

      if (isMatching) {
        return implement.type;
      } else {
        return undefined;
      }
    }
  }

  return undefined;
};

/**
 * Add extension to path
 */
export const restoreExtension = (path: string, ext?: string) => {
  if (!ext) {
    return path;
  }

  const fixedExt = ext.startsWith(".") ? ext : `.${ext}`;

  if (
    path.startsWith(".") &&
    !path.endsWith(".js") &&
    !path.endsWith(fixedExt)
  ) {
    return `${path}${fixedExt}`;
  }

  return path;
};

/**
 * To duplicate the import paths with the extension.
 * @param paths ImportDeclarations
 * @param ext extension
 * @returns duplicated import paths with the extension
 */
export const duplicateImportPathsWithExt = (paths: ImportDeclaration[], ext?: string) => {
  if(!ext){
    return paths;
  }

  return paths.map(path => {
    return {
      ...path,
      source: {
        ...path.source,
        value: restoreExtension(path.source.value, ext)
      }
    }
  })
};

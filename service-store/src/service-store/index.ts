// filepath: /c:/Users/jmlazaro/workspace/Store-playground/store-test/my-schematics/src/my-schematics/index.ts
import {
  Rule,
  SchematicContext,
  Tree,
  apply,
  url,
  applyTemplates,
  move,
  mergeWith,
  chain,
} from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';
import { Schema as MyServiceSchema } from './schema';

export function myService(options: MyServiceSchema): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const sourceTemplates = url('./files');
    const sourceParameterizedTemplates = apply(sourceTemplates, [
      applyTemplates({
        ...options,
        ...strings,
      }),
      move('src/app/store'),
    ]);
    return chain([mergeWith(sourceParameterizedTemplates)])(tree, _context);
  };
}
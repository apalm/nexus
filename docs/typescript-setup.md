---
id: typescript-setup
title: TypeScript Configuration
sidebar_label: Use with TypeScript
---

GraphQL Nexus was designed with TypeScript in mind. The goal is to have the best possible type coverage with the least possible manual type annotation. In order to do this, we have created a dedicated code generation template for graphql-code-generator.

```ts
const schema = makeSchema({
  types: [
    /* All types here */
  ],
});
```

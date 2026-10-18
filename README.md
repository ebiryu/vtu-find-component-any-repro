# @vue/test-utils: `findComponent(any)` is typed as `DOMWrapper<Node>` since 2.5.1

Reproduction for a type regression in `@vue/test-utils` 2.5.1.

## Steps

```sh
npm install
npm run type-check   # fails
```

On StackBlitz, `npm run type-check` runs automatically on startup.

`npm run type-check` reports:

```
src/components/__tests__/HelloWorld.spec.ts: error TS2339: Property 'vm' does not exist on type 'DOMWrapper<Node>'.
src/components/__tests__/HelloWorld.spec.ts: error TS2339: Property 'props' does not exist on type 'DOMWrapper<Node>'.
```

The test itself passes at runtime (`npm run test:unit -- --run`); only the types are wrong.

Changing `@vue/test-utils` to `2.5.0` in `package.json` makes the type check pass
(`findComponent(any)` returns `VueWrapper<any>`).

See [`src/components/__tests__/HelloWorld.spec.ts`](src/components/__tests__/HelloWorld.spec.ts).

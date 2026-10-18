import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import HelloWorld from '../HelloWorld.vue'

// When the component type cannot be inferred, the selector passed to
// findComponent() is `any`. This happens e.g. when typescript-eslint
// (type-aware linting) resolves a `.vue` import without Vue language support,
// or when a component comes from an untyped JS module.
const UnknownHelloWorld: any = HelloWorld

describe('HelloWorld', () => {
  it('renders properly', () => {
    const wrapper = mount(HelloWorld, { props: { msg: 'Hello Vitest' } })
    expect(wrapper.text()).toContain('Hello Vitest')
  })

  it('findComponent() with an `any` selector', () => {
    const wrapper = mount(HelloWorld, { props: { msg: 'Hello Vitest' } })
    const found = wrapper.findComponent(UnknownHelloWorld)

    // Works at runtime, but with @vue/test-utils 2.5.1 `found` is typed as
    // `DOMWrapper<Node>` instead of `VueWrapper<any>` (2.5.0), so vue-tsc reports:
    //   TS2339: Property 'vm' does not exist on type 'DOMWrapper<Node>'.
    //   TS2339: Property 'props' does not exist on type 'DOMWrapper<Node>'.
    expect(found.vm).toBeTruthy()
    expect(found.props('msg')).toBe('Hello Vitest')
  })
})

[Skip to content](https://developer.ugnas.com/en/doc/frontend/ugos-builder/buildConfig.html#VPContent)

Navigation

-   [Quick index](https://developer.ugnas.com/en/doc/frontend/ugos-builder/buildConfig.html#quick-index "Quick index")
-   [Imports](https://developer.ugnas.com/en/doc/frontend/ugos-builder/buildConfig.html#imports "Imports")
-   [API summary](https://developer.ugnas.com/en/doc/frontend/ugos-builder/buildConfig.html#api-summary "API summary")
-   [UgosViteBuilder](https://developer.ugnas.com/en/doc/frontend/ugos-builder/buildConfig.html#ugosvitebuilder "UgosViteBuilder")
    -   [Constructor](https://developer.ugnas.com/en/doc/frontend/ugos-builder/buildConfig.html#constructor "Constructor")
-   [pluginEntry(options?)](https://developer.ugnas.com/en/doc/frontend/ugos-builder/buildConfig.html#pluginentry-options "pluginEntry(options?)")
    -   [IPluginEntry](https://developer.ugnas.com/en/doc/frontend/ugos-builder/buildConfig.html#ipluginentry "IPluginEntry")
-   [BuildConfig](https://developer.ugnas.com/en/doc/frontend/ugos-builder/buildConfig.html#buildconfig "BuildConfig")
    -   [Fields](https://developer.ugnas.com/en/doc/frontend/ugos-builder/buildConfig.html#fields "Fields")
-   [Minimal example](https://developer.ugnas.com/en/doc/frontend/ugos-builder/buildConfig.html#minimal-example "Minimal example")

## `@ugreen-nas/builder-open` API [](https://developer.ugnas.com/en/doc/frontend/ugos-builder/buildConfig.html#ugreen-nas-builder-open-api)

Public **Vite** API, parameters, types, and usage for **`@ugreen-nas/builder-open`**.

___

## Quick index [](https://developer.ugnas.com/en/doc/frontend/ugos-builder/buildConfig.html#quick-index)

| Scenario | Section |
|------------------------------------|------------------------------|
| Wire the plugin in `vite.config.ts` | [`UgosViteBuilder`](https://developer.ugnas.com/en/doc/frontend/ugos-builder/buildConfig.html#ugosvitebuilder), [`pluginEntry`](https://developer.ugnas.com/en/doc/frontend/ugos-builder/buildConfig.html#pluginentry-options) |
| Main window metadata, `version.json` | [`BuildConfig`](https://developer.ugnas.com/en/doc/frontend/ugos-builder/buildConfig.html#buildconfig) |

___

## Imports [](https://developer.ugnas.com/en/doc/frontend/ugos-builder/buildConfig.html#imports)

ts

```python
import { UgosViteBuilder } from '@ugreen-nas/builder-open';
import type { BuildConfig } from '@ugreen-nas/builder-open';
```

ts

```javascript
// Optional: subpath equivalent
import { UgosViteBuilder } from '@ugreen-nas/builder-open/vite';
```

___

## API summary [](https://developer.ugnas.com/en/doc/frontend/ugos-builder/buildConfig.html#api-summary)

| Symbol | Kind | Description |
|-----------------|--------|----------------------------------------------------|
| `UgosViteBuilder` | class | Vite-facing builder |
| `BuildConfig` | type | Build config (types from `@ugreen-nas/builder-core`) |
| `pluginEntry` | method | Returns Vite plugin array |

___

## `UgosViteBuilder` [](https://developer.ugnas.com/en/doc/frontend/ugos-builder/buildConfig.html#ugosvitebuilder)

### Constructor [](https://developer.ugnas.com/en/doc/frontend/ugos-builder/buildConfig.html#constructor)

ts

```javascript
constructor(config: BuildConfig);
```

| Param | Type | Required | Description |
|--------|-------------|----------|-----------------------------|
| `config` | `BuildConfig` | Yes | Build and artifact metadata |

Use `pluginEntry()` inside `defineConfig({ plugins })` (see [`pluginEntry`](https://developer.ugnas.com/en/doc/frontend/ugos-builder/buildConfig.html#pluginentry-options) and [Minimal example](https://developer.ugnas.com/en/doc/frontend/ugos-builder/buildConfig.html#minimal-example)).

___

## `pluginEntry(options?)` [](https://developer.ugnas.com/en/doc/frontend/ugos-builder/buildConfig.html#pluginentry-options)

ts

```scss
pluginEntry(options?: IPluginEntry): never[];
```

Declared as `never[]`; **actually** `import('vite').Plugin[]`. Spread into `plugins`:

ts

```css
plugins: [...builder.pluginEntry()],
```

### `IPluginEntry` [](https://developer.ugnas.com/en/doc/frontend/ugos-builder/buildConfig.html#ipluginentry)

| Field | Type | Required | Default | Description |
|-----------------------|----------|----------|---------|---------------------------------------------------------|
| `mode` | `string` | No | `''` | `'analyze'` enables bundle analysis via `hooks.vitePlugins` |
| `removeConsoleExternal` | `string[]` | No | `[]` | Extra externals for `vite-plugin-remove-console` |

___

## `BuildConfig` [](https://developer.ugnas.com/en/doc/frontend/ugos-builder/buildConfig.html#buildconfig)

### Fields [](https://developer.ugnas.com/en/doc/frontend/ugos-builder/buildConfig.html#fields)

| Field | Type | Required | Default / notes |
|-----------------|---------------------------------------------------|----------------------|----------------------------------------------------|
| `windowConfig` | `unknown` | Strongly recommended | Shell window config; validation errors if missing |
| `getIgnoreFolder` | `(config: unknown, isElectron: boolean) => unknown` | **Yes** | Ignore globs; often merged with `['**/node_modules/**']` |
| `langPath` | `string` | No | Default `'src/language'` |

___

___

## Minimal example [](https://developer.ugnas.com/en/doc/frontend/ugos-builder/buildConfig.html#minimal-example)

# `@ugreen-nas/builder-open` API [](https://developer.ugnas.com/en/doc/frontend/ugos-builder/buildConfig.html#ugreen-nas-builder-open-api)

ts

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { UgosViteBuilder } from '@ugreen-nas/builder-open';
import path from 'node:path';

const builder = new UgosViteBuilder({
  windowConfig: { width: 1200, height: 800 },
  getIgnoreFolder: (patterns: unknown) => patterns,
});

export default defineConfig({
  plugins: [react(), ...builder.pluginEntry()],
});
```
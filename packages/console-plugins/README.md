# Plugins

```shell
//recommend to install by pnpm
pnpm i @console1024/plugins -D
```

## Webpack

### Environment

+ Nodejs>=15
+ webpack>=5

#### clear-flag-webpack-plugin

+ A plugin can clear some flags(you provide) in production environment

**Options**

```typescript
flags:'console'|'alert'|'confirm'|'prompt'|'debugger'|Array<'console'|'alert'|'confirm'|'prompt'|'debugger'>
```

**Usage**

```typescript
//import by ESM
import {ClearFlagsWebpackPlugin} from '@console1024/plugins'
//or commonjs
const {ClearFlagsWebpackPlugin} = require('@console1024/plugins')
module.exports = {
  //...your personal configuration
  plugins:[new ClearFlagsWebpackPlugin({flags:'console'})]
}
```

#### copy-webpack-plugin
+ copy some files/directory to your dist directory
+ based on Nodejs `fs` module

**Options**
```typescript
patterns: Array<Record<'from' | 'to', string> & {types?: boolean}>;
```

**Usage**
```typescript
//import by ESM
import {CopyWebpackPlugin} from '@console1024/plugins'
//or commonjs
const {CopyWebpackPlugin} = require('@console1024/plugins')
module.exports = {
  //...your personal configuration
  plugins:[new CopyWebpackPlugin({patterns:[
    {
      from:resolve(__dirname,'the file or directory you want to copy'),
      to:resolve(__dirname,'the destination you want to place'),
      types:true //if you want to generate corresponding .d.ts file
    }
  ]})]
}
```
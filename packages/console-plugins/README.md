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

A plugin can clear some flags(you provide) in production environment
**Options**

+ flags(string|string[])

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

## Validate your env variables

Avoid the scenerio where your app doesn't work properly because you're missing an environment variable.

## Installation

```bash
$ npm install validate-env --save
# ... or
$ yarn add validate-env

```

## Usage Examples:

**1.** First option is to use `validateEnvVariables` default functionality, which throws an `Error` on failure.

```js
const { validateEnvVariables } = require('validate-env');

try {
    validateEnvVariables(['GOOGLE_API_KEY', 'AWS_SECRET_KEY']);
} catch (error) {
    console.error(error);
    process.exit(1);
}

```

**2.** Or you can disable `throwsOnFailure` functionality, meaning `validateEnvVariables` will now return `false` when env variables are invalid.  

```js
const { validateEnvVariables } = require('validate-env');

if (!validateEnvVariables(['GOOGLE_API_KEY', 'AWS_SECRET_KEY'], { throwsOnFailure: false })) {
    console.log('One or more env vars are missing!');
    process.exit(1);
}
```


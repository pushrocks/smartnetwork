# @pushrocks/smartnetwork
network diagnostics

## Availabililty and Links
* [npmjs.org (npm package)](https://www.npmjs.com/package/@pushrocks/smartnetwork)
* [gitlab.com (source)](https://gitlab.com/pushrocks/smartnetwork)
* [github.com (source mirror)](https://github.com/pushrocks/smartnetwork)
* [docs (typedoc)](https://pushrocks.gitlab.io/smartnetwork/)

## Status for master
[![build status](https://gitlab.com/pushrocks/smartnetwork/badges/master/build.svg)](https://gitlab.com/pushrocks/smartnetwork/commits/master)
[![coverage report](https://gitlab.com/pushrocks/smartnetwork/badges/master/coverage.svg)](https://gitlab.com/pushrocks/smartnetwork/commits/master)
[![npm downloads per month](https://img.shields.io/npm/dm/@pushrocks/smartnetwork.svg)](https://www.npmjs.com/package/@pushrocks/smartnetwork)
[![Known Vulnerabilities](https://snyk.io/test/npm/@pushrocks/smartnetwork/badge.svg)](https://snyk.io/test/npm/@pushrocks/smartnetwork)
[![TypeScript](https://img.shields.io/badge/TypeScript->=%203.x-blue.svg)](https://nodejs.org/dist/latest-v10.x/docs/api/)
[![node](https://img.shields.io/badge/node->=%2010.x.x-blue.svg)](https://nodejs.org/dist/latest-v10.x/docs/api/)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-prettier-ff69b4.svg)](https://prettier.io/)

## Usage

```typescript
import * as smartnetwork from 'smartnetwork';
const testSmartNetwork = new smartnetwork.SmartNetwork();
const run = async () => {
  // measure average speed over a period of 5 seconds
  // the structure of speedResult is self explanatory using TypeScript (or the linked TypeDoc above)
  const speedResult = testSmartNetwork.getSpeed(5000);

  //
  const isLocalPortAvailable: boolean = await testSmartNetwork.isLocalPortAvailable(1234);
  const isRemotePortAvailable: boolean = await testSmartNetwork.isRemotePortAvailable(
    'google.com:80'
  );
  const isRemotePortAvailable: boolean = await testSmartNetwork.isRemotePortAvailable(
    'google.com',
    80
  );
};
```

For further information read the linked docs at the top of this readme.

> MIT licensed | **&copy;** [Lossless GmbH](https://lossless.gmbh)
| By using this npm module you agree to our [privacy policy](https://lossless.gmbH/privacy)

[![repo-footer](https://lossless.gitlab.io/publicrelations/repofooter.svg)](https://maintainedby.lossless.com)

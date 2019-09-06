import { expect, tap } from '@pushrocks/tapbundle';
import * as smartnetwork from '../ts/index';

let testSmartNetwork: smartnetwork.SmartNetwork;

tap.test('should create a valid instance of SmartNetwork', async () => {
  testSmartNetwork = new smartnetwork.SmartNetwork();
  expect(testSmartNetwork).to.be.instanceOf(smartnetwork.SmartNetwork);
});

tap.test('should perform a speedtest', async () => {
  let result = await testSmartNetwork.getSpeed();
  console.log(`Download speed for this instance is ${result.speeds.download}`);
  console.log(`Upload speed for this instance is ${result.speeds.upload}`);
});

tap.test('should determine wether a port is free', async () => {
  await expect(testSmartNetwork.isLocalPortAvailable(8080)).to.eventually.be.true;
});

tap.test('should scan a port', async () => {
  await expect(testSmartNetwork.isRemotePortAvailable('lossless.com:443')).to.eventually.be.true;
  await expect(testSmartNetwork.isRemotePortAvailable('lossless.com', 443)).to.be.eventually.true;
  // await expect(testSmartNetwork.isRemotePortAvailable('lossless.com:444')).to.eventually.be.false;
});

tap.test('should get the default gateways', async () => {
  const gatewayResult = await testSmartNetwork.getDefaultGateway();
  console.log(gatewayResult);
})

tap.start();

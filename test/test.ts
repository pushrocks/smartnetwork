import { expect, tap } from 'tapbundle'
import * as smartnetwork from '../ts/index'

let testSmartNetwork: smartnetwork.SmartNetwork

tap.test('should create a valid instance of SmartNetwork', async () => {
  testSmartNetwork = new smartnetwork.SmartNetwork()
  expect(testSmartNetwork).to.be.instanceOf(smartnetwork.SmartNetwork)
})

tap.test('should perform a speedtest', async () => {
  let result = await testSmartNetwork.getSpeed()
  console.log(`Download speed for this instance is ${result.speeds.download}`)
  console.log(`Upload speed for this instance is ${result.speeds.upload}`)
})

tap.start()

import * as plugins from './smartnetwork.plugins';

export class ISpeedtestData {
  speeds: {
    download: number;
    upload: number;
    originalDownload: number;
    originalUpload: number;
  };
  client: {
    ip: string;
    lat: number;
    lon: number;
    isp: string;
    isprating: string;
    rating: number;
    ispdlavg: number;
    ispulavg: number;
  };
  server: {
    host: string;
    lat: number;
    lon: number;
    location: string;
    country: string;
    cc: string;
    sponsor: string;
    distance: number;
    distanceMi: number;
    ping: number;
    id: string;
  };
}

/**
 * SmartNetwork simplifies actions within the network
 */
export class SmartNetwork {
  async getSpeed(measurementTime = 5000): Promise<ISpeedtestData> {
    let done = plugins.smartpromise.defer<ISpeedtestData>();
    const test = plugins.speedtestNet({ maxTime: measurementTime });
    test.on('data', data => {
      done.resolve(data);
    });
    test.on('error', err => {
      done.reject(err);
    });
    return await done.promise;
  }

  /**
   * returns a promise with a boolean answer
   * note: false also resolves with false as argument
   * @param port
   */
  async isLocalPortAvailable(port: number): Promise<boolean> {
    const doneIpV4 = plugins.smartpromise.defer<boolean>();
    const doneIpV6 = plugins.smartpromise.defer<boolean>();
    const net = await import('net'); // creates only one instance of net ;) even on multiple calls

    // test IPv4 space
    const ipv4Test = net.createServer();
    ipv4Test.once('error', function(err: any) {
      if (err.code !== 'EADDRINUSE') {
        doneIpV4.resolve(false);
        return;
      }
      doneIpV4.resolve(false);
    });
    ipv4Test.once('listening', function() {
      ipv4Test.once('close', () => {
        doneIpV4.resolve(true);
      });
      ipv4Test.close();
    });
    ipv4Test.listen(port, '0.0.0.0');

    await doneIpV4.promise;

    // test IPv6 space
    const test_ipv6 = net.createServer();
    test_ipv6.once('error', function(err: any) {
      if (err.code !== 'EADDRINUSE') {
        doneIpV6.resolve(false);
        return;
      }
      doneIpV6.resolve(false);
    });
    test_ipv6.once('listening', function() {
      test_ipv6.once('close', () => {
        doneIpV6.resolve(true);
      });
      test_ipv6.close();
    });
    test_ipv6.listen(port, '::');

    // lets wait for the result
    const resultIpV4 = await doneIpV4.promise;
    const resultIpV6 = await doneIpV6.promise;
    const result = resultIpV4 === true && resultIpV6 === true;
    return result;
  }
}

import * as plugins from './smartnetwork.plugins';

export interface ISpeedtestData {
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
  /**
   * get network speed
   * @param measurementTime
   */
  public async getSpeed(measurementTime = 5000): Promise<ISpeedtestData> {
    const done = plugins.smartpromise.defer<ISpeedtestData>();
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
  public async isLocalPortAvailable(port: number): Promise<boolean> {
    const doneIpV4 = plugins.smartpromise.defer<boolean>();
    const doneIpV6 = plugins.smartpromise.defer<boolean>();
    const net = await import('net'); // creates only one instance of net ;) even on multiple calls

    // test IPv4 space
    const ipv4Test = net.createServer();
    ipv4Test.once('error', (err: any) => {
      if (err.code !== 'EADDRINUSE') {
        doneIpV4.resolve(false);
        return;
      }
      doneIpV4.resolve(false);
    });
    ipv4Test.once('listening', () => {
      ipv4Test.once('close', () => {
        doneIpV4.resolve(true);
      });
      ipv4Test.close();
    });
    ipv4Test.listen(port, '0.0.0.0');

    await doneIpV4.promise;

    // test IPv6 space
    const ipv6Test = net.createServer();
    ipv6Test.once('error', function(err: any) {
      if (err.code !== 'EADDRINUSE') {
        doneIpV6.resolve(false);
        return;
      }
      doneIpV6.resolve(false);
    });
    ipv6Test.once('listening', () => {
      ipv6Test.once('close', () => {
        doneIpV6.resolve(true);
      });
      ipv6Test.close();
    });
    ipv6Test.listen(port, '::');

    // lets wait for the result
    const resultIpV4 = await doneIpV4.promise;
    const resultIpV6 = await doneIpV6.promise;
    const result = resultIpV4 === true && resultIpV6 === true;
    return result;
  }

  /**
   * checks wether a remote port is available
   * @param domainArg
   */
  public async isRemotePortAvailable(domainArg: string, portArg?: number): Promise<boolean> {
    const done = plugins.smartpromise.defer<boolean>();
    const domainPart = domainArg.split(':')[0];
    const port = portArg ? portArg : parseInt(domainArg.split(':')[1], 10);

    plugins.portscanner.checkPortStatus(port, domainPart, (err, status) => {
      if (err) {
        // console.log(err);
        return done.resolve(false);
      }
      if (status === 'open') {
        done.resolve(true);
      } else {
        done.resolve(false);
      }
    });
    const result = await done.promise;
    return result;
  }

  public async getGateways() {
    const result = plugins.os.networkInterfaces();
    return result;
  }

  public async getDefaultGateway(): Promise<{ipv4: plugins.os.NetworkInterfaceInfo, ipv6: plugins.os.NetworkInterfaceInfo}> {
    const defaultGatewayName = await plugins.systeminformation.networkInterfaceDefault();
    if (!defaultGatewayName) {
      console.log('Cannot determine default gateway');
      return null;
    }
    const gateways = await this.getGateways();
    const defaultGateway = gateways[defaultGatewayName];
    return {
      ipv4: defaultGateway[0],
      ipv6: defaultGateway[1]
    };
  }
}

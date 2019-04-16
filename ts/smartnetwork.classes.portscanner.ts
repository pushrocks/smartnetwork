import * as plugins from './smartnetwork.plugins';

export class PortScanner {
  public async checkPortStatus(domainArg: string): Promise<boolean> {
    const done = plugins.smartpromise.defer<boolean>();
    const domainPart = domainArg.split(':')[0];
    const port = parseInt(domainArg.split(':')[1], 10);

    plugins.portscanner.checkPortStatus(port, domainPart, (err, status ) => {
      if (err) {
        throw err;
      }
      if (status === 'open') {
        done.resolve(true);
      } else {
        done.resolve(false)
      }
    })
    const result = await done.promise;
    return result;
  }
}

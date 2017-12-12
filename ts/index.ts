import * as plugins from './smartnetwork.plugins'

export class ISpeedtestData {
  speeds: {
    download: number
    upload: number
    originalDownload: number
    originalUpload: number
  }
  client: {
    ip: string
    lat: number
    lon: number
    isp: string
    isprating: string
    rating: number
    ispdlavg: number
    ispulavg: number
  }
  server: {
    host: string,
    lat: number,
    lon: number,
    location: string,
    country: string,
    cc: string,
    sponsor: string,
    distance: number,
    distanceMi: number,
    ping: number,
    id: string
  }
}

export class SmartNetwork {
  async getSpeed (measurementTime = 5000): Promise<ISpeedtestData> {
    let done = plugins.smartq.defer<ISpeedtestData>()
    const test = plugins.speedtestNet({ maxTime: measurementTime });
    test.on('data', data => {
      done.resolve(data)
    });
    test.on('error', err => {
      done.reject(err)
    });
    return await done.promise
  }
}

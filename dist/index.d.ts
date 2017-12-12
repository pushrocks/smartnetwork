export declare class ISpeedtestData {
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
export declare class SmartNetwork {
    getSpeed(measurementTime?: number): Promise<ISpeedtestData>;
}

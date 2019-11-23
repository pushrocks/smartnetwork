// native scope
import * as os from 'os';

export { os };

// @pushrocks scope
import * as smartpromise from '@pushrocks/smartpromise';
import * as smartstring from '@pushrocks/smartstring';

export { smartpromise, smartstring };

// @third party scope
import * as portscanner from 'portscanner';
import publicIp from 'public-ip';
import speedtestNet from 'speedtest-net';
import * as systeminformation from 'systeminformation';

export { portscanner, publicIp, speedtestNet, systeminformation };

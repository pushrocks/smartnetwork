// native scope
import * as os from 'os';

export {
  os
};

// @pushrocks scope
import * as smartpromise from '@pushrocks/smartpromise';
import * as smartstring from '@pushrocks/smartstring';

export { smartpromise, smartstring };

// @third party scope 
const speedtestNet = require('speedtest-net');
import * as portscanner from 'portscanner';

export { speedtestNet, portscanner };

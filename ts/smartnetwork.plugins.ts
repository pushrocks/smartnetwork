// native scope

// @pushrocks scope
import * as smartpromise from '@pushrocks/smartpromise';
import * as smartstring from '@pushrocks/smartstring';

export { smartpromise, smartstring };

// @third party scope
import defaultGateway from 'default-gateway';
const speedtestNet = require('speedtest-net');
import * as portscanner from 'portscanner';

export { defaultGateway, speedtestNet, portscanner };

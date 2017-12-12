"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const plugins = require("./smartnetwork.plugins");
class ISpeedtestData {
}
exports.ISpeedtestData = ISpeedtestData;
class SmartNetwork {
    getSpeed(measurementTime = 5000) {
        return __awaiter(this, void 0, void 0, function* () {
            let done = plugins.smartq.defer();
            const test = plugins.speedtestNet({ maxTime: measurementTime });
            test.on('data', data => {
                done.resolve(data);
            });
            test.on('error', err => {
                done.reject(err);
            });
            return yield done.promise;
        });
    }
}
exports.SmartNetwork = SmartNetwork;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsa0RBQWlEO0FBRWpEO0NBOEJDO0FBOUJELHdDQThCQztBQUVEO0lBQ1EsUUFBUSxDQUFFLGVBQWUsR0FBRyxJQUFJOztZQUNwQyxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBa0IsQ0FBQTtZQUNqRCxNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxDQUFDLENBQUM7WUFDaEUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQUU7Z0JBQ3JCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDcEIsQ0FBQyxDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsRUFBRTtnQkFDckIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUNsQixDQUFDLENBQUMsQ0FBQztZQUNILE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUE7UUFDM0IsQ0FBQztLQUFBO0NBQ0Y7QUFaRCxvQ0FZQyJ9
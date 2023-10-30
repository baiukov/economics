import { getRandom } from './getRandom.js';
export const getDemandCurve = () => {
    const demandC = getRandom(11, 100);
    const demandK = getRandom(-10, -1);
    return [demandC, demandK];
};

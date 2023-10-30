import { getRandom } from './getRandom.js';
export const getTotalProductCurve = () => {
    const productionK1 = getRandom(11, 100);
    const productionK2 = getRandom(-0.1, -3);
    return [productionK1, productionK2];
};

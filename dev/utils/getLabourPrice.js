import { getRandom } from './getRandom.js';
export const getLabourPrice = () => {
    const labourPrice = getRandom(21, 200);
    return labourPrice;
};

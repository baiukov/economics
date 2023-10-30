export const getRandom = (max = 0, min = 0) => {
    return Math.round((Math.random() * (max - min) + min));
};

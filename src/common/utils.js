export const isFirefox = () => navigator.userAgent.indexOf('Firefox') !== -1;
export const isEdge = () => /Edge/.test(navigator.userAgent);
export const isSafari = () => /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
export const isOpera = () => (!!navigator.userAgent.match(/Opera|OPR\//));

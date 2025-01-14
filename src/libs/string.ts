export const makeid = (length = 10): string => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;

  let i = 0;
  for (i; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};

export const capitalize = (str: string): string =>
  str && typeof str === 'string' ? str.charAt(0).toUpperCase() + str.slice(1) : '';

export const firstLetters = (target: string, count = 1): string =>
  target
    ? target
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .substr(0, count)
    : '';

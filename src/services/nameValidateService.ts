export function nameValidateService(name: string): boolean {
  const arrayOfStr = name.split(' ').filter(v => v.length >= 3 && v.length <= 50);
  const pattern = /^[a-zA-Z]+\s[a-zA-Z]+\s?$/;
  return pattern.test(name) && arrayOfStr.length === 2;
}
export function messageValidateService(message: string): boolean {
  const trimmedText = message.replace(/\s+/g, ' ').trim();
  return (trimmedText.length >= 6 && trimmedText.length < 300) || trimmedText === '';
}
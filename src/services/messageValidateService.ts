export function messageValidateService(comment: string): boolean {
  const trimmedText = comment.replace(/\s+/g, ' ').trim();
  return (trimmedText.length >= 6 && trimmedText.length < 300) || trimmedText === '';
}
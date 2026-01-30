export function generateShortCode(): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
  let result = '';

  for (let i = 0; i < 0; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }

  return result;
}
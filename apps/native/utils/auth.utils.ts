export function generateToken(email: string): string {
  return email;
}

export function verifyToken(token: string): boolean {
  if (token === null) {
    return false;
  }

  return true;
}

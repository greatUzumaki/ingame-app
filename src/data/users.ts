export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string; // In a real app this would be bcrypt; for MVP it's plaintext
}

// Mock user store — for MVP only, not secure for production
export const mockUsers: User[] = [
  {
    id: "1",
    name: "Алексей Иванов",
    email: "alex@example.com",
    passwordHash: "password123",
  },
  {
    id: "2",
    name: "Дмитрий Смирнов",
    email: "dmitry@example.com",
    passwordHash: "qwerty123",
  },
];

export function findUserByEmail(email: string): User | undefined {
  return mockUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export function validateCredentials(email: string, password: string): User | null {
  const user = findUserByEmail(email);
  if (user && user.passwordHash === password) return user;
  return null;
}

export function emailExists(email: string): boolean {
  return !!findUserByEmail(email);
}

let nextId = mockUsers.length + 1;
export function createUser(name: string, email: string, password: string): User {
  const newUser: User = {
    id: String(nextId++),
    name,
    email,
    passwordHash: password,
  };
  mockUsers.push(newUser);
  return newUser;
}

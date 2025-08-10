export const formatDate = (date: Date): string => date.toLocaleDateString();
export const validateEmail = (email: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
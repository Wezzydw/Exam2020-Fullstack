const {"v4": uuidv4} = require('uuid');

export enum COLLECTIONS {
  CERTIFICATES = 'certificates',
  USERS = 'users',
}

export function generateMockDocument(data: Object = {}): Object {
  return { name: 'document name', ...data };
}

export function generateMockUpdateDocument(data: Object = {}): Object {
  return { name: 'updated document name', ...data };
}

export function documentPath(...parts: string[]): string {
  return parts.join('/');
}

export function generateId({
                             append = '',
                             prepend = '',
                           }: {
  append?: string;
  prepend?: string;
} = {}): string {
  let id = uuidv4();

  if (prepend) {
    id = `${prepend}-${id}`;
  }

  if (append) {
    id += `-${append}`;
  }

  return id;
}

export function generateUserId(): string {
  return generateId({ prepend: 'USER' });
}

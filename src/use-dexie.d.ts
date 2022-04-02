declare module 'use-dexie' {
  import { Database } from 'dexie'

  type TableSchemaDefinition = {
    // string value is Dexie's shorthand schema syntax
    [tableName: string]: string;
  }

  export function useDexie(
    dbName: string,
    ...params: (TableSchemaDefinition | number | ((db: Database) => void))[]
  ): Database

  // You could probably go sicko mode with some TypeScript here
  // and infer the types of these generics but this works for now.
  export function useDexieMap<T, U>(table: string): Map<T, U>

  export function useDexiePutItem<T>(table: string): (item: T, cb?: () => void) => void
}

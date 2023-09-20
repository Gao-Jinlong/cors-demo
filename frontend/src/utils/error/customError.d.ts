declare global {
  export class CustomError<C, T> extends Error {
    public readonly single?: C
    public readonly data?: T
    public constructor(message: string, single?: C, data?: T)
  }
}

export {}

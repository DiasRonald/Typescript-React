export enum accessOptions {
    administrator = "administrador",
    manager = "gerente",
    employee = "funcionário"
  }

  export interface userType {
    fullName: string,
    register?: number | string,
    access?: accessOptions,
    active?: boolean
  }
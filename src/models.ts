export enum accessOptions {
    administrator = "administrador",
    manager = "gerente",
    employee = "funcionário",
    undefined = "undefined",
  }

  export interface userType {
    fullName: string,
    register?: number | string,
    access: accessOptions,
    active: boolean
  }
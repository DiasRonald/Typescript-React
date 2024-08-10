export enum accessOptions {
    administrator = "administrador",
    manager = "gerente",
    employee = "funcionário",
    undefined = "Não definido"
  }

  export interface UserType {
    fullName: string,
    register?: number | string,
    access?: accessOptions,
    active?: boolean
  }
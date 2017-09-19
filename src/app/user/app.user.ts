export class User {
    constructor(
      public email: string,
      public birthDate: Date,
      public name: string,
      public phoneNumber: string,
      public id?: number,
      public version?: number,
    ) { }
  }
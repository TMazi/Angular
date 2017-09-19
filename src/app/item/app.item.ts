export class Item {
  constructor(
    public category: string,
    public color: string,
    public dateOfFound: Date,
    public description: string,
    public name: string,
    public status: string,
    public weight: number,
    public photoUrl?: string,
    public id?: number,
    public version?: number,
    public returnDate?: Date
  ) { }
}
export interface IPhone {
  Generation: string;
  ANumber: string[];
  Bootrom: string[];
  FCCID: string[];
  InternalName: string;
  Identifier: string;
  Image: string;
  Models: {
    Color: string;
    Storage: string;
    Model: string[];
  }[];
}

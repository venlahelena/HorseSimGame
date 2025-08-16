export interface Horse {
  id: string; // use 'id' everywhere for consistency
  name: string;
  breed: string;
  age: number;
  gender: "stallion" | "mare" | "gelding";
  stats: {
    speed: number;
    stamina: number;
    agility: number;
  };
  traits: {
    coatColor: string;
    markings?: string;
  };
  forSale: boolean;
  price?: number;
  owner?: string;
}
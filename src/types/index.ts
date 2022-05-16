export interface prefectures {
  prefCode: number;
  prefName: string;
  isSelected: boolean;
}

interface data {
  year: number;
  value: number;
}
export interface populations {
  prefCode: number;
  data: Array<data>;
}

export interface compositionUrl {
  prefCode: number;
  url: string;
}

export interface series {
  type: string;
  name: string;
  data: Array<number>;
}

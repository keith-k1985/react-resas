interface result {
  prefCode: number;
  prefName: string;
}

export interface prefectures {
  prefCode: number;
  prefName: string;
  message: null;
  isSelected: boolean;
  result: Array<result>;
}

interface data {
  year: number;
  value: number;
}

export interface populations {
  prefCode: number;
  prefName: string;
  data: Array<data>;
}

export interface series {
  type: string;
  name: string;
  data: Array<number>;
}

export interface popdata {
  populationdata: {
    prefName: string;
    data: { year: number; value: number }[]; // 年，年の人数
  }[];
}

export interface checkboxtype {
  // 都道府県
  prefectures:
    | {
        prefCode: number;
        prefName: string;
      }[];
  // チェック時イベント
  onChanges: (name: string, prefName: number, check: boolean) => void;
}

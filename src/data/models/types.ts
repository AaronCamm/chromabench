export type ModelCategory = "aircraft" | "vehicle" | "ship";

export type SchemeColorCallout = {
  role: string;
  fs?: string;
  standardName?: string;
  tamiya?: string;
  vallejo?: string;
  sms?: string;
  mrColor?: string;
  notes?: string;
};

export type SchemeSource = {
  label: string;
  url?: string;
};

export type PaintScheme = {
  id: string;
  name: string;
  operator?: string;
  unit?: string;
  year?: string;
  buno?: string;
  colors: SchemeColorCallout[];
  sources: SchemeSource[];
};

export type ModelSubject = {
  id: string;
  name: string;
  category: ModelCategory;
  aliases: string[];
  era?: string;
  schemes: PaintScheme[];
};

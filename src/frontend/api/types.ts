export type JWTData = {
  access: string;
  refresh?: string;
};

export type PaginationData<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export type ModelID = number | string;

export type User = {
  id: ModelID;
  email: string;
  first_name: string | null;
  last_name: string | null;
  picture: string | null;
  age: number | null;
  height: number | null;
  weight: number | null;
  items?: TrackItem[];
};

export type PortionItem = {
  id: ModelID;
  name: string;
  is_default: boolean;
};

export type TrackItem = {
  id: ModelID;
  item?: PortionItem | ModelID;
  user?: User | ModelID;
  target: number;
  order: number | undefined;
  frequency: number;
  logs?: UserLog[];
};

export type UserLog = {
  id: ModelID;
  item?: TrackItem | ModelID;
  timestamp: string | Date;
};

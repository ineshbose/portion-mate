export type AuthToken = {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
  interceptor?: number;
};

export type AuthError = {
  error: string;
  error_description: string;
};

export type FormError = {
  [field: string]: string | string[];
};

export type PaginationData<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export type FetchData<T> = PaginationData<T> | T[];

export type CreateData<T, R extends keyof T> = Partial<Omit<T, 'id'>> & {
  [P in R]: T[R];
};

export type UpdateData<T extends { id: ModelID }> = Partial<T> & {
  id: T['id'];
};

export type ModelID = number | string;

export type User = {
  id: ModelID;
  email: string;
  forename: string | null;
  surname: string | null;
  picture: string | null;
  age: number | null;
  height: number | null;
  weight: number | null;
  items?: TrackItems;
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
  logs?: UserLogs;
};

export type TrackItems = TrackItem[];

export type UserLog = {
  id: ModelID;
  item?: TrackItem | ModelID;
  timestamp: string | Date;
};

export type UserLogs = UserLog[];

export type Resource = {
  id: ModelID;
  title: string;
  author: string;
  link: string;
  date_published: string;
  content: string;
  bookmarked?: boolean;
};

export type Resources = Resource[];

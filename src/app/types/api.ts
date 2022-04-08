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

export type CreateData<
  T extends GenericModel | ModelID = GenericModel,
  R extends keyof T | string = 'name'
> = Partial<Omit<T, 'id' | R>> & {
  [P in R]: R extends keyof T
    ? NonNullable<T[R]> extends GenericModel | ModelID
      ? CreateData<NonNullable<T[R]>> | ModelID
      : T[R]
    : any;
};

export type UpdateData<T extends GenericModel = GenericModel> = Partial<T> & {
  id: T['id'];
};

export type ModelID = number | string;

export type FrequencyDisplay = 'DAILY' | 'WEEKLY' | 'MONTHLY';

export type GenericModel = { id: ModelID };

export type User = GenericModel & {
  email: string;
  forename: string | null;
  surname: string | null;
  picture: string | null;
  age: number | null;
  height: number | null;
  weight: number | null;
  items?: TrackItems;
};

export type PortionItem = GenericModel & {
  name: string;
  is_default?: boolean;
};

export type TrackItem = GenericModel & {
  item?: PortionItem | ModelID;
  user?: User | ModelID;
  target: number;
  order: number | undefined;
  frequency: number;
  logs?: UserLogs;
};

export type TrackItems = TrackItem[];

export type UserLog = GenericModel & {
  item?: TrackItem | ModelID;
  timestamp: string | Date;
};

export type UserLogs = UserLog[];

export type Resource = GenericModel & {
  title: string;
  author: string;
  link: string;
  date_published: string;
  content: string;
  bookmarked?: boolean;
};

export type Resources = Resource[];

export type Journal = GenericModel & {
  meal: string;
  content: string;
  entry_time: string;
};

export type Journals = Journal[];

export type Prettify<T> = { [K in keyof T]: T[K] };

export type Store<T> = { [K in keyof T]: T[K] };
export type Keys<T> = keyof T;
export type Values<T> = T[keyof T];
export type SubjectValue<T> = Store<T> | object;

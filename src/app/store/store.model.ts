import { Signal } from "@angular/core";
import { Observable } from "rxjs";

type Prettify<T> = { [K in keyof T]: T[K] };

export type Store<T> = Prettify<{ [K in keyof T]: T[K] }>;
export type Keys<T> = keyof T;
export type Values<T> = T[keyof T];
export type SubjectValue<T> = Store<T> | {};
export type ResultSelect<T> = Observable<Prettify<{ [K in keyof T]: T[K]; }>[keyof T] | undefined>;
export type ResultSelectSignal<T> = Signal<Prettify<{ [K in keyof T]: T[K]; }>[keyof T] | undefined>;

import { Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Keys, Store, SubjectValue, Values } from './general-store.model';

export abstract class GeneralStoreService<T> {
  /**
   * Propiedad para almacenar los datos a instanciar en la clase hija
   */
  protected _storeSubject: BehaviorSubject<Store<T> | object> = new BehaviorSubject<Store<T> | object>({});

  /**
   * Propiedad para almacenar los datos a instanciar en la clase hija
   */
  protected abstract initValueStore: Store<T>;

  constructor() {
    this.init();
  }

  /**
   * Método para la inicialización de la store
   */
  init(): void {
    this._storeSubject.next({ ...this.initValueStore });
  }

  /**
   * Metodo para la obtención de datos a partir del id el observable
   * @param id
   */
  select<K extends Keys<T>>(id: K): Observable<T[K]> {
    return this._storeSubject.pipe(
      map((data: SubjectValue<T>) => {
        return data ? (data as Store<T>)[id] : undefined;
      })
    ) as Observable<T[K]>;
  }

  /**
   * Metodo para la obtención de datos a partir del id Signal para consumir en html
   * @param id
   */
  selectToSignal<K extends Keys<T>>(id: K): Signal<T[K]> {
    return toSignal(
      this._storeSubject.pipe(
        map((data: SubjectValue<T>) => {
          return data ? (data as Store<T>)[id] : undefined;
        })
      )
    ) as Signal<T[K]>;
  }

  /**
   * Metodo modificación de la Store
   * @param objectKey
   * @param data
   */
  setData(objectKey: Keys<T>, data: Values<T>): void {
    const actualValue: SubjectValue<T> = this._storeSubject.getValue();
    (actualValue as Store<T>)[objectKey] = data;
    this._storeSubject.next(actualValue);
  }

  /**
   * Metodo volver al estado inicial de la store
   * @param id
   */
  cleanStore(): void {
    this._storeSubject.next({ ...this.initValueStore });
  }
}

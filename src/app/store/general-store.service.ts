import { BehaviorSubject, map } from "rxjs";
import { Keys, ResultSelect, ResultSelectSignal, Store, SubjectValue, Values,  } from "./store.model";
import { toSignal } from "@angular/core/rxjs-interop";

export abstract class GeneralStoreService<T> {
    
    /**
     * Propiedad para almacenar los datos a instanciar en la clase hija
     */
    protected _storeSubject: BehaviorSubject<Store<T> | {}> = new BehaviorSubject<Store<T> | {}>({});

    /**
     * Propiedad para almacenar los datos a instanciar en la clase hija
     */
    protected abstract initValueStore: Store<T>;

    /**
     * Método para la inicialización de la store
    */
    init(): void {
        this._storeSubject.next(this.initValueStore);
    }

    /**
     * Metodo para la obtención de datos a partir del id el observable
     * @param id 
     */
    select(id: Keys<T>): ResultSelect<T> {
        return this._storeSubject.pipe(
            map((data: SubjectValue<T>) => {
                return data ? (data as Store<T>)[id] : undefined;
            }
        ));
    }

    /**
     * Metodo para la obtención de datos a partir del id Signal para consumir en html
     * @param id 
     */
    selectToSignal(id: Keys<T>): ResultSelectSignal<T> {
        return toSignal(this._storeSubject.pipe(
            map((data: SubjectValue<T>) => {
                return data ? (data as Store<T>)[id] : undefined;
            }
        )));
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
        this._storeSubject.next(this.initValueStore);
    }
}
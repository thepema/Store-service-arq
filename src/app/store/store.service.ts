import { Injectable,} from '@angular/core';
import { Store } from './general-store.model';
import { GeneralStoreService } from './general-store.service';

type initStore = { user: string; token: string; email: string | null };


@Injectable()
export class StoreService extends GeneralStoreService<initStore>{
    

    protected override initValueStore: Store<initStore> = {
        user: 'initial',
        token: 'null',
        email: null,
    };

    // signals para consumir los datos
    public user$ =  this.selectToSignal('user');
    public token$ = this.selectToSignal('token');
    public email$ = this.selectToSignal('email');



    constructor() {
        super();
    }

    initStore(): void {
        this.init();
    }

}
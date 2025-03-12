const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Función para preguntar al usuario
const askQuestion = (query) => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise((resolve) => rl.question(query, (ans) => {
        rl.close();
        resolve(ans);
    }));
};

const generateService = async () => {
    const className = await askQuestion('¿Cuál es el nombre de la clase (escrita en camelCase sin el Service)? ');
    const ruta = await askQuestion('¿Cuál es la ruta relativa donde crear el fichero? ');

    const content = `
import { Injectable } from '@angular/core';
import { GeneralStoreService } from '@core/utils/store/general-store.service';
import { Store } from '@core/utils/store/general-store.model';

// crear modelo para tipar la store
type initStore = {};

@Injectable()
export class ${className}Service extends GeneralStoreService<initStore> {
    // Iniciar Store de la Feature
    protected override initValueStore: Store<initStore> = {
    };

    // signals para consumir los datos
    // public _variableName_$ = this.selectToSignal('_variableName_');

    constructor() {
        super();
    }

    initStore(): void {
        this.init();
    }
}
`;

    const filePath = path.join(process.cwd(), `${ruta}/${className.toLowerCase()}.service.ts`);
    fs.writeFileSync(filePath, content.trim());
    console.log(`${className}Service servicio generado en ${filePath}`);
};

generateService();
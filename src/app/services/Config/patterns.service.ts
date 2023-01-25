
import { Injectable } from '@angular/core';

@Injectable()
export class PatternsService {

    patternOnlyNumber: string ="^[0-9]*";

    patternOnlyNumberFive: string ="^[0-9]{5,15}$";

    patternOnlyStringSpace: string ="^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]{2,50}$";

    patternOnlyString: string ="^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]{2,30}$";

}
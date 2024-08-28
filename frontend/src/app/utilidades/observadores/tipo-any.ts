import { Observer } from 'rxjs';

export const observadorAny: Observer<any> = {
  next(respuesta) {},
  error(mierror) {},
  complete() {},
};
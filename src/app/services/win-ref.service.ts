import {Injectable} from '@angular/core';

export interface ICustomWindow extends Window {
  __custom_global_stuff: string;
}

function getWindow(): any {
  return window;
}

@Injectable({
  providedIn: 'root'
})
export class WinRefService {

  get nativeWindow(): ICustomWindow {
    return getWindow();
  }

}

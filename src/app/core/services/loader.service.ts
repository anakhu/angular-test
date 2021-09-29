import { Injectable } from '@angular/core';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private static loaderEnabled: boolean;

  private static _timer: any;

  get loaderEnabled() {
    return LoaderService.loaderEnabled;
  }

  public static showLoader() {
    LoaderService.loaderEnabled = true;
  }

  public static hideLoader() {
    LoaderService.loaderEnabled = false;
  }

  public static get timer() {
    return this._timer;
  }

  public static set timer(timer) {
    this._timer = timer;
  }

  public static resetTimer() {
    if (this._timer) {
      clearInterval(this._timer);
    }
  }
}

export function LoaderEnabled(): MethodDecorator {
  return function (target: any, propertyKey: any, descriptor: PropertyDescriptor) {
    const original = descriptor.value;
    descriptor.value = function () {
      LoaderService.resetTimer();

      LoaderService.timer = setTimeout(() => {
        LoaderService.showLoader();
      }, 200);

      return original.apply(this, arguments).pipe(
        finalize(() => {
          LoaderService.resetTimer();
          LoaderService.hideLoader();
        }),
      );
    };
    return descriptor;
  };
}

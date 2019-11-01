export function AutoUnsubscribe(blackList: string[] = []): Function {
  return (constructor: any): any => {
    const original = constructor.prototype.ngOnDestroy;

    constructor.prototype.ngOnDestroy = (): any => {
      for (const prop of this) {
        const property = this[prop];
        if (!blackList.includes(prop)) {
          if (property && typeof property.unsubscribe === 'function') {
            property.unsubscribe();
          }
        }
      }
      /* tslint:disable */
      original && typeof original === 'function' && original.apply(this, arguments);
      /* tslint:enable */
    };
  };
}

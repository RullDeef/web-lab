export class BaseFactory<T> {
  create?(): T;

  generate(count: number, ctx: Partial<T> = {}): T[] {
    const res: T[] = [];

    for (let i = 0; i < count; i++) res.push({ ...this.create(), ...ctx });

    return res;
  }
}

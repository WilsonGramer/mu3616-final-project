export type ZIterable<E> = E extends Iterable<any>[]
    ? { [k in keyof E]: E[k] extends Iterable<infer T> ? T : E[k] }
    : never;

export const zip = <E extends Iterable<any>[]>(...args: E): Iterable<[...ZIterable<E>]> => ({
    [Symbol.iterator]() {
        const iterators = args.map((arg) => arg[Symbol.iterator]());
        return {
            next() {
                const results = iterators.map((iter) => iter.next());
                if (results.length === 0 || results.some(({ done }) => done)) {
                    return { done: true, value: undefined };
                } else {
                    const values = results.map(({ value }) => value) as ZIterable<E>;
                    return { done: false, value: [...values] };
                }
            },
        };
    },
});

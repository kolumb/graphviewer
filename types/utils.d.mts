export declare function assert(condition: boolean, message?: string): void;
export declare function todo(description: string | undefined): void;
type keyValuePair = {
    [key: string]: string | number;
};
export declare function Enum(list: string[]): keyValuePair;
export {};

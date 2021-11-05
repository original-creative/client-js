/// <reference types="jest" />
declare const Fetch: jest.Mock<Promise<any>, [url: string, options: any]>;
export default Fetch;

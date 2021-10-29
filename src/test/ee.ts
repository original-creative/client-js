import { EventEmitter } from "events";
import { RequestManager, EventEmitterTransport, Client } from "..";

const chan1 = "chan1";
const chan2 = "chan2";

const emitter = new EventEmitter();
const transport = new EventEmitterTransport(emitter, chan1, chan2);
const requestManager = new RequestManager([transport]);
const client = new Client(requestManager);

// event emitter server code
emitter.on(chan1, (jsonrpcRequest) => {
  const res = {
    jsonrpc: "2.0",
    result: [],
    id: jsonrpcRequest.id,
  };
  emitter.emit(chan2, JSON.stringify(res));
});

const main = async () => {
  const result = await client.request({method: "addition", params: [2, 2]});
  console.log(result);
};

main().then(() => {
  console.log("DONE");
});
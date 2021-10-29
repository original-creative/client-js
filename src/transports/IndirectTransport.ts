import { Transport } from "./Transport";
import { JSONRPCRequestData, getNotifications } from "../Request";
import { JSONRPCError, ERR_UNKNOWN } from "../Error";


type RpcId = number | string


export interface ResponseFunc {
  (msg: string): void;
}

export interface Intermediary {
  request(msg: string, response: ResponseFunc): void;
}

export class IndirectTransport extends Transport {
  intermediary: Intermediary;

  constructor(intermediary: Intermediary) {
    super();
    this.intermediary = intermediary;
  }

  onResponse(msg: string): void {
    this.transportRequestManager.resolveResponse(msg);
  }

  public connect(): Promise<any> {
    return Promise.resolve();
  }

  public sendData(data: JSONRPCRequestData, timeout: number | null = null): Promise<any> {
    const prom = this.transportRequestManager.addRequest(data, timeout);
    const notifications = getNotifications(data);
    const parsedData = this.parseData(data);

    if (data instanceof Array) {
      return Promise.reject();
    }

    try {
      this.intermediary.request(JSON.stringify(parsedData),
        this.onResponse.bind(this))
      this.transportRequestManager.settlePendingRequest(notifications);
      return prom;
    } catch (e) {
      const responseErr = new JSONRPCError((e as Error).message, ERR_UNKNOWN, e);
      this.transportRequestManager.settlePendingRequest(notifications, responseErr);
      return Promise.reject(responseErr);
    }
  }

  public close() {
  }
}


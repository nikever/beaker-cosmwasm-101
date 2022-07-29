/**
* This file was automatically generated by cosmwasm-typescript-gen@0.3.9.
* DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
* and run the cosmwasm-typescript-gen generate command to regenerate this file.
*/

import { CosmWasmClient, ExecuteResult, SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { Coin, StdFee } from "@cosmjs/amino";
export type ExecuteMsg = {
  increment: {
    [k: string]: unknown;
  };
} | {
  decrement: {
    [k: string]: unknown;
  };
} | {
  reset: {
    count: number;
    [k: string]: unknown;
  };
};
export interface GetCountResponse {
  count: number;
  [k: string]: unknown;
}
export interface GetVersionResponse {
  contract: string;
  version: string;
  [k: string]: unknown;
}
export interface InstantiateMsg {
  count: number;
  [k: string]: unknown;
}
export type QueryMsg = {
  get_count: {
    [k: string]: unknown;
  };
} | {
  get_version: {
    [k: string]: unknown;
  };
};
export type Addr = string;
export interface State {
  count: number;
  owner: Addr;
  [k: string]: unknown;
}
export interface CounterReadOnlyInterface {
  contractAddress: string;
  getCount: () => Promise<GetCountResponse>;
  getVersion: () => Promise<GetVersionResponse>;
}
export class CounterQueryClient implements CounterReadOnlyInterface {
  client: CosmWasmClient;
  contractAddress: string;

  constructor(client: CosmWasmClient, contractAddress: string) {
    this.client = client;
    this.contractAddress = contractAddress;
    this.getCount = this.getCount.bind(this);
    this.getVersion = this.getVersion.bind(this);
  }

  getCount = async (): Promise<GetCountResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      get_count: {}
    });
  };
  getVersion = async (): Promise<GetVersionResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      get_version: {}
    });
  };
}
export interface CounterInterface extends CounterReadOnlyInterface {
  contractAddress: string;
  sender: string;
  increment: (fee?: number | StdFee | "auto", memo?: string, funds?: readonly Coin[]) => Promise<ExecuteResult>;
  decrement: (fee?: number | StdFee | "auto", memo?: string, funds?: readonly Coin[]) => Promise<ExecuteResult>;
  reset: ({
    count
  }: {
    count: number;
  }, fee?: number | StdFee | "auto", memo?: string, funds?: readonly Coin[]) => Promise<ExecuteResult>;
}
export class CounterClient extends CounterQueryClient implements CounterInterface {
  client: SigningCosmWasmClient;
  sender: string;
  contractAddress: string;

  constructor(client: SigningCosmWasmClient, sender: string, contractAddress: string) {
    super(client, contractAddress);
    this.client = client;
    this.sender = sender;
    this.contractAddress = contractAddress;
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.reset = this.reset.bind(this);
  }

  increment = async (fee: number | StdFee | "auto" = "auto", memo?: string, funds?: readonly Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      increment: {}
    }, fee, memo, funds);
  };
  decrement = async (fee: number | StdFee | "auto" = "auto", memo?: string, funds?: readonly Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      decrement: {}
    }, fee, memo, funds);
  };
  reset = async ({
    count
  }: {
    count: number;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, funds?: readonly Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      reset: {
        count
      }
    }, fee, memo, funds);
  };
}
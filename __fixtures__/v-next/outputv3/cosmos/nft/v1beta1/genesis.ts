import { Class, ClassAmino, ClassSDKType, NFT, NFTAmino, NFTSDKType } from "./nft";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { DeepPartial, isSet } from "../../../helpers";
export const protobufPackage = "cosmos.nft.v1beta1";
/** GenesisState defines the nft module's genesis state. */
export interface GenesisState {
  /** class defines the class of the nft type. */
  classes: Class[];
  entries: Entry[];
}
export interface GenesisStateProtoMsg {
  typeUrl: "/cosmos.nft.v1beta1.GenesisState";
  value: Uint8Array;
}
/** GenesisState defines the nft module's genesis state. */
export interface GenesisStateAmino {
  /** class defines the class of the nft type. */
  classes?: ClassAmino[];
  entries?: EntryAmino[];
}
/** GenesisState defines the nft module's genesis state. */
export interface GenesisStateSDKType {
  classes: ClassSDKType[];
  entries: EntrySDKType[];
}
/** Entry Defines all nft owned by a person */
export interface Entry {
  /** owner is the owner address of the following nft */
  owner: string;
  /** nfts is a group of nfts of the same owner */
  nfts: NFT[];
}
export interface EntryProtoMsg {
  typeUrl: "/cosmos.nft.v1beta1.Entry";
  value: Uint8Array;
}
/** Entry Defines all nft owned by a person */
export interface EntryAmino {
  /** owner is the owner address of the following nft */
  owner?: string;
  /** nfts is a group of nfts of the same owner */
  nfts?: NFTAmino[];
}
/** Entry Defines all nft owned by a person */
export interface EntrySDKType {
  owner: string;
  nfts: NFTSDKType[];
}
function createBaseGenesisState(): GenesisState {
  return {
    classes: [],
    entries: []
  };
}
export const GenesisState = {
  typeUrl: "/cosmos.nft.v1beta1.GenesisState",
  aminoType: "cosmos-sdk/GenesisState",
  encode(message: GenesisState, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.classes) {
      Class.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.entries) {
      Entry.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = true): GenesisState {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.classes.push(Class.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 2:
          message.entries.push(Entry.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): GenesisState {
    const obj = createBaseGenesisState();
    if (Array.isArray(object?.classes)) obj.classes = object.classes.map((e: any) => Class.fromJSON(e));
    if (Array.isArray(object?.entries)) obj.entries = object.entries.map((e: any) => Entry.fromJSON(e));
    return obj;
  },
  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    if (message.classes) {
      obj.classes = message.classes.map(e => e ? Class.toJSON(e) : undefined);
    } else {
      obj.classes = [];
    }
    if (message.entries) {
      obj.entries = message.entries.map(e => e ? Entry.toJSON(e) : undefined);
    } else {
      obj.entries = [];
    }
    return obj;
  },
  fromPartial(object: DeepPartial<GenesisState>): GenesisState {
    const message = createBaseGenesisState();
    message.classes = object.classes?.map(e => Class.fromPartial(e)) || [];
    message.entries = object.entries?.map(e => Entry.fromPartial(e)) || [];
    return message;
  },
  fromSDK(object: GenesisStateSDKType): GenesisState {
    return {
      classes: Array.isArray(object?.classes) ? object.classes.map((e: any) => Class.fromSDK(e)) : [],
      entries: Array.isArray(object?.entries) ? object.entries.map((e: any) => Entry.fromSDK(e)) : []
    };
  },
  toSDK(message: GenesisState): GenesisStateSDKType {
    const obj: any = {};
    if (message.classes) {
      obj.classes = message.classes.map(e => e ? Class.toSDK(e) : undefined);
    } else {
      obj.classes = [];
    }
    if (message.entries) {
      obj.entries = message.entries.map(e => e ? Entry.toSDK(e) : undefined);
    } else {
      obj.entries = [];
    }
    return obj;
  },
  fromAmino(object: GenesisStateAmino): GenesisState {
    const message = createBaseGenesisState();
    message.classes = object.classes?.map(e => Class.fromAmino(e)) || [];
    message.entries = object.entries?.map(e => Entry.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: GenesisState, useInterfaces: boolean = true): GenesisStateAmino {
    const obj: any = {};
    if (message.classes) {
      obj.classes = message.classes.map(e => e ? Class.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.classes = message.classes;
    }
    if (message.entries) {
      obj.entries = message.entries.map(e => e ? Entry.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.entries = message.entries;
    }
    return obj;
  },
  fromProtoMsg(message: GenesisStateProtoMsg, useInterfaces: boolean = true): GenesisState {
    return GenesisState.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: GenesisState): Uint8Array {
    return GenesisState.encode(message).finish();
  },
  toProtoMsg(message: GenesisState): GenesisStateProtoMsg {
    return {
      typeUrl: "/cosmos.nft.v1beta1.GenesisState",
      value: GenesisState.encode(message).finish()
    };
  }
};
function createBaseEntry(): Entry {
  return {
    owner: "",
    nfts: []
  };
}
export const Entry = {
  typeUrl: "/cosmos.nft.v1beta1.Entry",
  aminoType: "cosmos-sdk/Entry",
  encode(message: Entry, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.owner !== "") {
      writer.uint32(10).string(message.owner);
    }
    for (const v of message.nfts) {
      NFT.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = true): Entry {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.owner = reader.string();
          break;
        case 2:
          message.nfts.push(NFT.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Entry {
    const obj = createBaseEntry();
    if (isSet(object.owner)) obj.owner = String(object.owner);
    if (Array.isArray(object?.nfts)) obj.nfts = object.nfts.map((e: any) => NFT.fromJSON(e));
    return obj;
  },
  toJSON(message: Entry): unknown {
    const obj: any = {};
    message.owner !== undefined && (obj.owner = message.owner);
    if (message.nfts) {
      obj.nfts = message.nfts.map(e => e ? NFT.toJSON(e) : undefined);
    } else {
      obj.nfts = [];
    }
    return obj;
  },
  fromPartial(object: DeepPartial<Entry>): Entry {
    const message = createBaseEntry();
    message.owner = object.owner ?? "";
    message.nfts = object.nfts?.map(e => NFT.fromPartial(e)) || [];
    return message;
  },
  fromSDK(object: EntrySDKType): Entry {
    return {
      owner: object?.owner,
      nfts: Array.isArray(object?.nfts) ? object.nfts.map((e: any) => NFT.fromSDK(e)) : []
    };
  },
  toSDK(message: Entry): EntrySDKType {
    const obj: any = {};
    obj.owner = message.owner;
    if (message.nfts) {
      obj.nfts = message.nfts.map(e => e ? NFT.toSDK(e) : undefined);
    } else {
      obj.nfts = [];
    }
    return obj;
  },
  fromAmino(object: EntryAmino): Entry {
    const message = createBaseEntry();
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = object.owner;
    }
    message.nfts = object.nfts?.map(e => NFT.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: Entry, useInterfaces: boolean = true): EntryAmino {
    const obj: any = {};
    obj.owner = message.owner === "" ? undefined : message.owner;
    if (message.nfts) {
      obj.nfts = message.nfts.map(e => e ? NFT.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.nfts = message.nfts;
    }
    return obj;
  },
  fromProtoMsg(message: EntryProtoMsg, useInterfaces: boolean = true): Entry {
    return Entry.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: Entry): Uint8Array {
    return Entry.encode(message).finish();
  },
  toProtoMsg(message: Entry): EntryProtoMsg {
    return {
      typeUrl: "/cosmos.nft.v1beta1.Entry",
      value: Entry.encode(message).finish()
    };
  }
};
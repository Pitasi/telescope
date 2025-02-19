import { BinaryReader, BinaryWriter } from "../../../binary";
import { isSet, bytesFromBase64, base64FromBytes, DeepPartial } from "../../../helpers";
export const protobufPackage = "akash.base.v1beta1";
/** Unit stores cpu, memory and storage metrics */
export interface ResourceValue {
  val: Uint8Array;
}
export interface ResourceValueProtoMsg {
  typeUrl: "/akash.base.v1beta1.ResourceValue";
  value: Uint8Array;
}
/** Unit stores cpu, memory and storage metrics */
export interface ResourceValueAmino {
  val?: string;
}
export interface ResourceValueAminoMsg {
  type: "/akash.base.v1beta1.ResourceValue";
  value: ResourceValueAmino;
}
/** Unit stores cpu, memory and storage metrics */
export interface ResourceValueSDKType {
  val: Uint8Array;
}
function createBaseResourceValue(): ResourceValue {
  return {
    val: new Uint8Array()
  };
}
export const ResourceValue = {
  typeUrl: "/akash.base.v1beta1.ResourceValue",
  encode(message: ResourceValue, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.val.length !== 0) {
      writer.uint32(10).bytes(message.val);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): ResourceValue {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResourceValue();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.val = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): ResourceValue {
    const obj = createBaseResourceValue();
    if (isSet(object.val)) obj.val = bytesFromBase64(object.val);
    return obj;
  },
  toJSON(message: ResourceValue): unknown {
    const obj: any = {};
    message.val !== undefined && (obj.val = base64FromBytes(message.val !== undefined ? message.val : new Uint8Array()));
    return obj;
  },
  fromPartial(object: DeepPartial<ResourceValue>): ResourceValue {
    const message = createBaseResourceValue();
    message.val = object.val ?? new Uint8Array();
    return message;
  },
  fromSDK(object: ResourceValueSDKType): ResourceValue {
    return {
      val: object?.val
    };
  },
  toSDK(message: ResourceValue): ResourceValueSDKType {
    const obj: any = {};
    obj.val = message.val;
    return obj;
  },
  fromAmino(object: ResourceValueAmino): ResourceValue {
    const message = createBaseResourceValue();
    if (object.val !== undefined && object.val !== null) {
      message.val = bytesFromBase64(object.val);
    }
    return message;
  },
  toAmino(message: ResourceValue): ResourceValueAmino {
    const obj: any = {};
    obj.val = message.val ? base64FromBytes(message.val) : undefined;
    return obj;
  },
  fromAminoMsg(object: ResourceValueAminoMsg): ResourceValue {
    return ResourceValue.fromAmino(object.value);
  },
  fromProtoMsg(message: ResourceValueProtoMsg): ResourceValue {
    return ResourceValue.decode(message.value);
  },
  toProto(message: ResourceValue): Uint8Array {
    return ResourceValue.encode(message).finish();
  },
  toProtoMsg(message: ResourceValue): ResourceValueProtoMsg {
    return {
      typeUrl: "/akash.base.v1beta1.ResourceValue",
      value: ResourceValue.encode(message).finish()
    };
  }
};
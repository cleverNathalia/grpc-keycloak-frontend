// package: 
// file: src/proto/hello.proto

import * as src_proto_hello_pb from "../../src/proto/hello_pb";
import {grpc} from "@improbable-eng/grpc-web";

type HelloServiceHello = {
  readonly methodName: string;
  readonly service: typeof HelloService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof src_proto_hello_pb.HelloRequest;
  readonly responseType: typeof src_proto_hello_pb.HelloReply;
};

export class HelloService {
  static readonly serviceName: string;
  static readonly Hello: HelloServiceHello;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: (status?: Status) => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: (status?: Status) => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: (status?: Status) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class HelloServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  hello(
    requestMessage: src_proto_hello_pb.HelloRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: src_proto_hello_pb.HelloReply|null) => void
  ): UnaryResponse;
  hello(
    requestMessage: src_proto_hello_pb.HelloRequest,
    callback: (error: ServiceError|null, responseMessage: src_proto_hello_pb.HelloReply|null) => void
  ): UnaryResponse;
}


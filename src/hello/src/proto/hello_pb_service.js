// package: 
// file: src/proto/hello.proto

var src_proto_hello_pb = require("../../src/proto/hello_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var HelloService = (function () {
  function HelloService() {}
  HelloService.serviceName = "HelloService";
  return HelloService;
}());

HelloService.Hello = {
  methodName: "Hello",
  service: HelloService,
  requestStream: false,
  responseStream: false,
  requestType: src_proto_hello_pb.HelloRequest,
  responseType: src_proto_hello_pb.HelloReply
};

exports.HelloService = HelloService;

function HelloServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

HelloServiceClient.prototype.hello = function hello(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(HelloService.Hello, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

exports.HelloServiceClient = HelloServiceClient;


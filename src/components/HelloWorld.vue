<template>
  <v-container>
    <v-layout
      text-center
      wrap
    >
      <span>YASS</span>
 
    </v-layout>
  </v-container>
</template>
 
<script lang="ts">
import Vue from 'vue';
import { grpc } from '@improbable-eng/grpc-web';
import { HelloRequest, HelloReply } from '@/hello/src/proto/hello_pb';
import { HelloService } from '@/hello/src/proto/hello_pb_service';
 
export default Vue.extend({
  name: 'HelloWorld',
 
  data: () => ({}),
  mounted: () => {
    // const req = new HelloRequest();
    // req.setRole("user");
 
    // const repl = new HelloReply();
 
    // grpc.invoke(HelloService.Hello, {
    //   request: req,
    //   host: 'http://127.0.0.1:9090/',
    //   onMessage: (message: HelloReply) => {
    //     console.log('GOT IT', message.toObject());
    //   },
    //   onEnd: (code: grpc.Code, msg: string | undefined, trailers:grpc.Metadata) => {
    //     if (code === grpc.Code.OK) {
    //       console.log('YAS');
    //       console.log(code);
    //       console.log(msg);
    //       console.log(trailers);
    //     } else {
    //       console.log('NAH FAM');
    //       console.log(code);
    //       console.log(msg);
    //       console.log(trailers);
    //     }
    //   },
    // });
  },
});
</script>
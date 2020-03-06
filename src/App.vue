<template>
  <v-app>
    <Nav v-bind:headerName="headerName" v-bind:keycloak="keycloak" />
    <!-- Call the correct components according to data -->
    <v-content>
      <br>
      <span class="display-3 font-weight-thin pa-8">GRPC Example:</span>
      <component
        v-bind:is="componentName"
        v-bind:peopleArr="peopleArr"
        v-bind:peopleHeader="peopleHeader"
      />
      <!-- <v-btn v-on:click="logOut">LOGOUT</v-btn> -->
    </v-content>
  </v-app>
</template>
 
<script lang="ts">
import Vue from "vue";
// ADD THE NEW COMPONENTS
import User from "./components/User.vue";
import Admin from "./components/Admin.vue";
import Nav from "./components/Nav.vue";
// ADD KEYCLOAK
import Keycloak from "../node_modules/keycloak-js/dist/keycloak";
//ADD GRPC
import { grpc } from "@improbable-eng/grpc-web";
//ADD STUBS
import { HelloRequest, HelloReply } from "@/hello/src/proto/hello_pb";
import { HelloService } from "@/hello/src/proto/hello_pb_service";

export default Vue.extend({
  name: "App",

  components: {
    User,
    Admin,
    Nav
  },

  data: () => ({
    componentName: "",
    peopleArr: [],
    peopleHeader: ["ID", "Name", "Address", "Phone"],
    role: String,
    headerName: String,
    initOptions: {
      realm: "keycloak-demo",
      url: "http://localhost:8080/auth/",
      clientId: "vue-test-app"
    },
    keycloak: Keycloak()
  }),

  methods: {
    loadPage(): any {
      // THIS IS THE COPIED CODE FROM THE KEYCLOAK ADMINISTRATION CONSOLE. JUST ADAPT IT, SO THAT IT MATHES THIS FORMAT
      this.keycloak = Keycloak(this.initOptions);

      let roles = "";

      this.keycloak
        .init({
          onLoad: "login-required"
        })
        .success((auth: any) => {
          // CHECK IF THE USER IS AUTHENTICATED
          if (!auth) {
            window.location.reload();
          } else {
            console.log("SUCCESSFULLY AUTHENTICATED");

            // CHECK WHAT ROLES THEY HAVE AND DISPLAY THE COMPONENT ACCORDING TO THE ROLE
            roles = JSON.parse(JSON.stringify(this.keycloak.tokenParsed));
            this.role = roles.realm_access.roles;
            this.componentName = String(this.role);

            this.headerName = this.componentName == "admin" ? "teal lighten-2" : "teal darken-3";

            //MAKE GRPC CALL TO BACKEND
            const req = new HelloRequest();
            req.setRole(String(this.role));

            const repl = new HelloReply();

            grpc.invoke(HelloService.Hello, {
              request: req,
              host: "http://localhost:9090/",
              onMessage: (message: HelloReply) => {
                console.log("RECEIVED DATA", message.toObject());
                for (let i = 0; i < message.array[0].length; i++) {
                  this.peopleArr.push(message.array[0][i]);
                }
              },
              onEnd: (
                code: grpc.Code,
                msg: string | undefined,
                trailers: grpc.Metadata
              ) => {
                if (code === grpc.Code.OK) {
                  console.log("CALL WAS SUCCESSFULL");
                  console.log(code);
                  console.log(msg);
                  console.log(trailers);
                } else {
                  console.log("CALL FAILED");
                  console.log(code);
                  console.log(msg);
                  console.log(trailers);
                }
              }
            });
          }

          // SET THE TOKEN IN THE LOCALSTORAGE
          localStorage.setItem("vue-token", String(this.keycloak.token));
          localStorage.setItem(
            "vue-refresh-token",
            String(this.keycloak.refreshToken)
          );

          // HANDLE TOKEN TIMEOUT
          setTimeout(() => {
            this.keycloak
              .updateToken(70)
              .success(refreshed => {
                if (refreshed) {
                  console.log("Token Refreshed");
                } else {
                  console.log("Token Not Refreshed");
                }
              })
              .error(() => {
                console.log("Failed To Refresh Token");
              });
          }, 60000);
        })
        .error(() => {
          console.log("AUTHENTICATION FAILED");
        });

      // keycloak.logout();
    }
  },
  mounted() {
    this.loadPage();
  }
});
</script>
import { Component } from "angular2/core" ;
import { ROUTER_DIRECTIVES , RouteConfig} from "angular2/router";

// import { Menu } from "./../menu/menu";
import { HomeComponent } from "./../home/homeComponent";
import { AboutComponent } from "./../about/aboutComponent";
import { ApiComponent } from "./../testApi/apiComponent";
import { SocketComponent } from "./../socket/socketComponent";
import { FormComponent } from "./../form/formComponent";

@Component({
    selector : "start-app",
    templateUrl : "./app/components/app/app.html",
    directives : [ROUTER_DIRECTIVES]
})
@RouteConfig([
    // { path : "/",  redirectTo : ["Home"] },
        { path: "/home", name: "Home", component: HomeComponent, useAsDefault: true },
        { path: "/about", name: "About", component: AboutComponent },
        { path: "/form", name: "Form", component: FormComponent },
        { path: "/testApi", name: "TestApi", component: ApiComponent },
        { path: "/scoket", name: "Socket", component: SocketComponent }
])
export class AppComponent {

    constructor () {

    }

}
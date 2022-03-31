# kanto
AngularJS Simple Router

This package is aiming to make Angular routing easier

## Usage

Configuration happens through the module `kantoProvider` where configs are set as default, but routes can have custom configuration

### Example
```javascript
(function(angular) {
  var module = angular.module("my_angular_application");

  module.config(["kantoProvider", function(provider) {
    provider.defaultConfig = { // This will be the default configuration for any route
      controller: "Cyberhawk.Controller",
      controllerAs: "genericController",
      templateBuilder(route, params) {
        return route + "?ajax=true";
      }
    };

    provider.configs = [{
      routes: ["/"],
      config: {
        controller: "Home.Controller",
        controllerAs: "homeController"
      }
    }, {
      routes: ["/simulations/new", "/simulations/:id/clone"],
      config: {
        controller: "Simulation.NewController",
        controllerAs: "genericController"
      }
    }, {
      routes: ["/simulations/:id", "/simulations"] // This will use the generic controller
    }];
    provider.$get().bindRoutes();
  }]);
}(window.angular));
```

(function(_, angular) {
  class RouteConfig {
    constructor(route, config, defaults) {
      this.route = route;

      _.extend(this, defaults, config);
    }

    routerConfig() {
      return _.extend({}, this, {
        templateUrl: this._buildTemplate()
      });
    }

    templateBuilder(route, _) {
      return route + '.html';
    }

    _buildTemplate() {
      var routeConfig = this;

      return function(params) {
        return routeConfig.templateBuilder(routeConfig.route, params);
      };
    }
  }

  class Router{
    constructor(settings) {
      _.extend(this, settings);

      _.bindAll(this, '_setRouteConfig', '_setRoutesConfig');
    }

    bindRoutes() {
      _.each(this.configs, this._setRoutesConfig);
      _.each(this.customRoutes, this._setRouteConfig);
    }

    _setRoutesConfig(settings) {
      var router = this;

      _.each(settings.routes, function(route) {
        router._setRouteConfig(settings.config, route);
      });
    }

    _setRouteConfig(config, route) {
      var routeConfig = new RouteConfig(route, config, this.defaultConfig);

      this.provider.when(route, routeConfig.routerConfig());
    }
  }

  // Old prototype style, can't get rid of it :(
  function RouterProvider() {
    _.bindAll(this, '$get');
  };

  var module = angular.module('kanto', ['ngRoute']),
    fn = RouterProvider.prototype;

  fn.$get = function() {
    return this.router || this._build();
  };

  fn._build = function() {
    return this.router = new Router({
      provider: fn.provider,
      defaultConfig: this.defaultConfig || {},
      configs: this.configs || [],
      customRoutes: this.customRoutes || []
    });
  };

  module.provider('kanto', RouterProvider);

  module.config(['$routeProvider', function(provider) {
    fn.provider = provider;
  }]);
}(window._, window.angular));


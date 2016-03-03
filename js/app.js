var view_id = "view"
addEventListener("hashchange", function () {
    goto()
})
addEventListener("load", function () {
    goto()
})
function goto() {
    var current_path = location.hash.substr(1).split("?")[0]
    var current_parameters = location.hash.substr(1).split("?")[1]
    var parameters = {}
    if (current_parameters) {
        var parameters_list = current_parameters.split("&")
        for (var i in parameters_list) {
            parameters[parameters_list[i].split("=")[0]] = parameters_list[i].split("=")[1]
        }
    }

    if (routes[current_path]) {
        new Render({
            id: view_id,
            templateUrl: routes[current_path].templateUrl,
            success: function () {
                if (typeof routes[current_path].Control == "function") {
                    new routes[current_path].Control(parameters)
                }
            }
        })
    }
    else {
        location.hash = default_path
        if (routes[default_path]) {
            new Render({
                id: view_id,
                templateUrl: routes[default_path].templateUrl,
                success: function () {
                    if (typeof routes[default_path].Control == "function") {
                        new routes[default_path].Control(parameters)
                    }
                }
            })
        }
    }


}

function Render(config) {
    if (config.id && config.templateUrl) {
        var view_content = $("#" + config.id)
        $.ajax({
            method: "GET",
            url: config.templateUrl
        }).success(function (r) {
                view_content.html(r)
                if (typeof config.success == "function") {
                    config.success()
                }
            }
        ).error(function () {
                view_content.html("加载失败")
                if (typeof config.error == "function") {
                    config.error()
                }
            }
        )
    }
}

var routes = {}
var default_path = ""

var route_provider = new Object({
    when: function (path, route) {
        routes[path] = route
        return this
    },
    otherwise: function (path) {
        default_path = path
        return this
    }
})


route_provider
    .when("/dashboard", {
        templateUrl: "templates/dashboard.html",
        Control: Dashboard
    })
    .when("/products/retrieve", {
        templateUrl: "templates/products/retrieve.html",
        Control: Retrieve
    })
    .when("/products/modify", {
        templateUrl: "templates/products/modify.html"
    })
    .when("/products/create", {
        templateUrl: "templates/products/create.html",
        Control: Products_create
    })

    .when("/test", {
        templateUrl: "templates/test.html",
        Control: TestClass,
    })
    .otherwise("/dashboard")
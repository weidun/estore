var routes = {}
var default_path = ""
var view_id = "view"
addEventListener("hashchange", function () {
    goto()
})
addEventListener("load", function () {
    goto()
})
function goto(request_path, message) {
    var path = location.hash.substr(1)
    if (routes[request_path]) {
        render({
            id: view_id,
            templateUrl: routes[request_path].templateUrl,
            message: message || {},
            success: routes[request_path].func
        })
        location.hash = request_path
    }
    else {
        if (routes[path]) {
            render({
                id: view_id,
                templateUrl: routes[path].templateUrl,
                success: routes[path].func
            })
        }
        else {
            location.hash = default_path
            if (routes[default_path]) {
                render({
                    id: view_id,
                    templateUrl: routes[default_path].templateUrl,
                    success: routes[default_path].func
                })
            }
        }
    }

}
function render(obj) {
    if (obj.id && obj.templateUrl) {
        $.ajax({
            method: "GET",
            url: obj.templateUrl,
        }).success(function (r) {
            if (typeof obj.success == "function") {
                $("#" + obj.id).html(r)
                new obj.success(obj.message)
            }
            else {
                $("#" + obj.id).html(r)
            }
        }).error(function (r) {
            $("#" + obj.id).html("加载失败")
            console.log(r)
            if (typeof obj.error == "function") {
                obj.error()
            }
        })
    }
}


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
        templateUrl: "/templates/dashboard.html",
        func: Dashboard
    })
    .when("/products/retrieve", {
        templateUrl: "/templates/products/retrieve.html"
    })
    .when("/products/modify", {
        templateUrl: "/templates/products/modify.html"
    })
    .when("/products/create", {
        templateUrl: "/templates/products/create.html",
        func: products_create
    })

    .when("/test", {
        func: TestClass,
        templateUrl: "/templates/test.html"
    })
    .otherwise("/dashboard")
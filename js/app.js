var routes = {}
var default_path = ""

addEventListener("hashchange", function () {
    goto()
})
addEventListener("load", function () {
    goto()
})
function goto() {
    var path = location.hash.substr(1)
    if (routes[path]) {
        render({
            id: "view",
            templateUrl: routes[path].templateUrl,
            success: routes[path].func
        })
    }
    else {
        location.hash = default_path
        if (routes[default_path]) {
            render({
                id: "view",
                templateUrl: routes[default_path].templateUrl,
                success: routes[default_path].func
            })
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
                $("#" + obj.id).html(r).promise().done(obj.success)
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
        func: dashboard
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
    .otherwise("/dashboard")
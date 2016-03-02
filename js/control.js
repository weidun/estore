function Dashboard() {
    var chart = new CanvasJS.Chart("simple_column_chart",
        {
            title: {
                text: "Top Oil Reserves"
            },
            animationEnabled: true,
            axisY: {
                title: "Reserves(MMbbl)"
            },
            legend: {
                verticalAlign: "bottom",
                horizontalAlign: "center"
            },
            data: [
                {
                    type: "column",
                    dataPoints: [
                        {y: 297571, label: "Venezuela"},
                        {y: 267017, label: "Saudi"},
                        {y: 175200, label: "Canada"},
                        {y: 154580, label: "Iran"},
                        {y: 116000, label: "Russia"},
                        {y: 97800, label: "UAE"},
                        {y: 20682, label: "US"},
                        {y: 20350, label: "China"}
                    ]
                }
            ]
        }
    )
    chart.render()

}
function products_create() {
    function image_preview(input_id, preview_id) {
        var input = document.querySelector("#" + input_id)
        var preview = document.querySelector("#" + preview_id)

        input.addEventListener("change", function (e) {
            if (e.target.files.length > 0) {
                preview.innerHTML = ""
                for (var i = 0; i < e.target.files.length; i++) {
                    var file_reader = new FileReader()
                    file_reader.addEventListener("load", function (m) {
                        var image = new Image()
                        image.src = m.target.result
                        preview.appendChild(image)
                    })
                    file_reader.readAsDataURL(e.target.files[i])
                }
            }
        })
    }

    function submit() {
        if (document.querySelector("#form").checkValidity()) {

        }
    }

    image_preview("thumb", "thumb_preview")
    image_preview("carousel", "carousel_preview")
    image_preview("detail", "detail_preview")
}
function TestClass(message) {
    console.log(typeof message)
}

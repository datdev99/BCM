let category = []; let data = []
var results = [];
var results1 = [];
let iD = 1;

function getPie() {
    $.ajax({
        type: "GET",
        url: "/api/Todo/GetTodo",
        dataType: "json",
        success: function (response) {
            // Code to handle the successful response from the API
            response.map(x => {
                results.push(x.name, x.value)
                results1.push(results)
                results = []
            })

            renderPie(results1);
        },
        error: function (xhr, status, error) {
            // Code to handle any errors that may occur while connecting to the API
            console.error(status + ": " + error);
        }
    });

}

function getPieDetail(id) {
    $.ajax({
        type: "GET",
        url: "/api/Todo/GetDetailTodo?id=" + id,
        dataType: "json",
        success: function (response) {
            // Code to handle the successful response from the API
            category = []
            data = []
            response.map(x => {
                category.push(x.name);
                data.push(x.value);

            })
            console.log(data, "data")
            renderChart(data)
        },
        error: function (xhr, status, error) {
            // Code to handle any errors that may occur while connecting to the API
            console.error(status + ": " + error);
        }
    });

}

getPie()
getPieDetail(1)
function renderChart(data1) {
    var options = {
        chart: {
            width: "100%",
            height: 380,
            type: "bar"
        },
        plotOptions: {
            bar: {
                horizontal: true
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            width: 1,
            colors: ["#fff"]
        },
        series: [
            {
                data: data1
            }
        ],
        xaxis: {
            categories: category
        },
        tooltip: {
            custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                return (
                    '<div class="arrow_box">' +
                    "<span>" +
                    w.globals.labels[dataPointIndex] +
                    ": " +
                    series[seriesIndex][dataPointIndex] +
                    "</span>" +
                    "</div>"
                );
            }
        }
    };
    var chart = new ApexCharts(document.querySelector("#apex-chart"), options);


    chart.render();
}

function renderPie(data) {
    Highcharts.chart('container', {

        title: {
            text: 'Thực Đơn'
        },

        //xAxis: {
        //    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        //},
        plotOptions: {
            series: {
                point: {
                    events: {
                        click: function (event) {
                            // window.open(event.point.name)
                            iD = this.id.split("-")[2];
                            //console.log(iD,"iD")
                            let html = "<div></div>"
                            document.querySelector("#apex-chart").innerHTML = html
                            getPieDetail(iD)

                        }
                    }
                }
                
            }
        },
        series: [{
            type: 'pie',
            allowPointSelect: true,
            //keys: ['name', 'y', 'selected', 'sliced'],
            data: data,
            //   showInLegend: true
        }],

    });

}




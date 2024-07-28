let khoanggio = [
    "05:00",
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00"
]
let SLSan = 8
let arrDatSan = []
let arrNgayCoDinh = []

let today = new Date();
let year = today.getFullYear();

const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
})

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

function setdate() {
    // Định dạng ngày theo YYYY-MM-DD
   
    let day = ("0" + today.getDate()).slice(-2); // Đảm bảo có 2 chữ số
    let month = ("0" + (today.getMonth() + 1)).slice(-2); // Tháng bắt đầu từ 0, cần +1
    let formattedDate = year + "-" + month + "-" + day;
    let txtngay = day + "-" + month + "-" + year;
    //$("#txtNgay").html(txtngay)
    $('#date').val(formattedDate);
    $("#dateDV").val(formattedDate);
}

function getdata() {
    let url = "/api/san/GetOrderSan?date=" + $("#date").val()
    $.ajax({
        type: "GET",
        url: url,
        success: function (response) {
            renderSan(response)
            response.map(item => {
                readData(item)
            })
            merge()
        },
        error: function (xhr, status, error) {
            // Code to handle any errors that may occur while connecting to the API
            console.error(status + ": " + error);
        }
    });
}


function GetNgay(month, year, name) {
    let url = "/api/libs/GetNgay?month=" + month + "&year=" + year + "&name=" + name;
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "GET",
            url: url,
            success: function (response) {
                arrNgayCoDinh = response;
                console.log(arrNgayCoDinh, "Eee"); // This will show the correct data
                resolve(response);
            },
            error: function (xhr, status, error) {
                console.error(status + ": " + error);
                reject(error);
            }
        });
    });
}


function renderKhoanggio() {
    let html = "<tr>"
    html += `<th class="sticky"></th>`
    khoanggio.map(item => {
        html += `
            <th>${item}</th>
        `
    })
    html += "</tr>"

    $("#thead").html(html)
}

function renderSan(data) {
    let html = ""
    data.map(item => {
        html += `
        <tr>
        <td class="sticky color">SÂN ${item.san}</td>
        <td class="${renderClass(item['Gio@5'])}" id="row${item.san}col5">${renderText(item['Gio@5'])}</td>
        <td class="${renderClass(item['Gio@6'])}" id="row${item.san}col6">${renderText(item['Gio@6'])}</td>
        <td class="${renderClass(item['Gio@7'])}" id="row${item.san}col7">${renderText(item['Gio@7'])}</td>
        <td class="${renderClass(item['Gio@8'])}" id="row${item.san}col8">${renderText(item['Gio@8'])}</td>
        <td class="${renderClass(item['Gio@9'])}" id="row${item.san}col9">${renderText(item['Gio@9'])}</td>
        <td class="${renderClass(item['Gio@10'])}" id="row${item.san}col10">${renderText(item['Gio@10'])}</td>
        <td class="${renderClass(item['Gio@11'])}" id="row${item.san}col11">${renderText(item['Gio@11'])}</td>
        <td class="${renderClass(item['Gio@12'])}" id="row${item.san}col12">${renderText(item['Gio@12'])}</td>
        <td class="${renderClass(item['Gio@13'])}" id="row${item.san}col13">${renderText(item['Gio@13'])}</td>
        <td class="${renderClass(item['Gio@14'])}" id="row${item.san}col14">${renderText(item['Gio@14'])}</td>
        <td class="${renderClass(item['Gio@15'])}" id="row${item.san}col15">${renderText(item['Gio@15'])}</td>
        <td class="${renderClass(item['Gio@16'])}" id="row${item.san}col16">${renderText(item['Gio@16'])}</td>
        <td class="${renderClass(item['Gio@17'])}" id="row${item.san}col17">${renderText(item['Gio@17'])}</td>
        <td class="${renderClass(item['Gio@18'])}" id="row${item.san}col18">${renderText(item['Gio@18'])}</td>
        <td class="${renderClass(item['Gio@19'])}" id="row${item.san}col19">${renderText(item['Gio@19'])}</td>
        <td class="${renderClass(item['Gio@20'])}" id="row${item.san}col20">${renderText(item['Gio@20'])}</td>
        <td class="${renderClass(item['Gio@21'])}" id="row${item.san}col21">${renderText(item['Gio@21'])}</td>
        <td class="${renderClass(item['Gio@22'])}" id="row${item.san}col22">${renderText(item['Gio@22'])}</td>
        <td class="${renderClass(item['Gio@23'])}" id="row${item.san}col23">${renderText(item['Gio@23'])}</td>
        </tr>
        `
    })
    $("#tbody").html(html)
}

function readData(item) {
    let san = item.san
    delete item.ngay
    delete item.san
    for (let key in item) {
        if (item.hasOwnProperty(key)) {
            if (item[key].length > 0) {
                // console.log(`body #row${san}col${endCol(item[key])}`);
                $(`body #tbody #row${san}col${endCol(item[key])}`).html(renderText(item[key]))
            }
        }
    }
}

function endCol(item) {
    let data = item.split('@')
    return Number(data[0]) + Number(data[2]) - 1
}


function renderText(item) {
    if (item.length > 0) {
        let data = item.split('@')
        return data[3] + " - " + data[1] + " - " + data[5]
    }
    return ""
}

function renderClass(item) {
    if (item.length > 0) {
        let data = item.split('@')
        if (data[4] == 2) {
            return "vanglai"
        }
        return "codinh"
    }
    return ""
}

function renderTuDen() {
    let html = ""
    khoanggio.map((item, index) => {
        let value = index + 5
        html += `
            <option value=${value}>${item}</option>
            `
    })
    $("#fromTime").html(html)
    $("#toTime").html(html)
}

function datsan(obj) {
    return $.ajax({
        url: '/api/san/postDatSan',
        type: 'post',
        dataType: 'json',
        data: JSON.stringify(obj),
        contentType: 'application/json',
        success: function (data) {
            if (data == "false") {
                Toast.fire({
                    icon: 'error',
                    title: 'Sân đã được đặt'
                })
            }
            else {
                Toast.fire({
                    icon: 'success',
                    title: 'Đặt sân thành công'
                })
                getdata()
            }
        }
    });
}

function formatdate(date) {
    // Convert the date string to a Date object
    var dateObj = new Date(date);

    // Extract the day, month, and year
    var day = ("0" + dateObj.getDate()).slice(-2); // Add leading zero if needed
    var month = ("0" + (dateObj.getMonth() + 1)).slice(-2); // Months are zero-based
    var year = dateObj.getFullYear();

    // Format the date as dd-mm-yyyy
    var formattedDate = day + '-' + month + '-' + year;

    return formattedDate;
}


$("#btn-xacnhan").on("click", function () {
    arrDatSan.length = 0
    let san = $("#san").val()
    let tugio = $("#fromTime").val()
    let dengio = $("#toTime").val()
    let fullname = $("#fullname").val()
    let phone = $("#phone").val()
    let ghichu = $("#ghichu").val()
    let status = $('input[name="check"]:checked').val();

    if (status == 1) {
        let name = $("#thungay").val()
        let thang = $("#thang").val()
        async function handlePromise() {
            try {
                await GetNgay(thang, year, name);
                arrNgayCoDinh.map(item => {
                    let obj = {
                        id: -1,
                        tenKH: fullname,
                        phone: phone,
                        san: san,
                        tugio: tugio,
                        dengo: dengio,
                        ghichu: ghichu,
                        status: status,
                        ngay: item.date,//$("#date").val(),
                        soluong: dengio - tugio
                    }
                    arrDatSan.push(obj)
                })
                console.log(arrDatSan)
                datsan(arrDatSan)
            } catch (error) {
                console.error("Error:", error);
            }
        }

        // Assuming thang, year, and name are defined
        handlePromise();
    }
    else {
        let obj = {
            id: -1,
            tenKH: fullname,
            phone: phone,
            san: san,
            tugio: tugio,
            dengo: dengio,
            ghichu: ghichu,
            status: status,
            ngay: $("#date").val(),
            soluong: dengio - tugio
        }
        arrDatSan.push(obj)
        datsan(arrDatSan)
    }
    //
})

$("#date").on("change", function () {
    getdata()
})

$('input[type=radio][name=check]').change(function () {
    if (this.value == '2') {
        $("#radioCoDinh").toggleClass("show")
    }
    else if (this.value == '1') {
        $("#radioCoDinh").toggleClass("show")
    }
});

$(document).ready(function () {
    setdate()
    getdata()
    //Lịch đặt sân
    renderKhoanggio()
    renderTuDen()

    //Quầy
    getOrderQuay()
    GetDanhSachDichVu()
})

function merge() {
    $('#tbody tr').each(function () {
        var $row = $(this);
        var lastValue = null;
        var spanCount = 1;
        var $lastCell = null;

        $row.find('td:not(:first)').each(function () { // Bỏ qua ô đầu tiên (SÂN)
            var $cell = $(this);
            var cellValue = $cell.text().trim();

            if (cellValue === lastValue && cellValue !== "") {
                spanCount++;
                $lastCell.attr('colspan', spanCount);
                $cell.remove();
            } else {
                lastValue = cellValue;
                $lastCell = $cell;
                spanCount = 1;
            }
        });
    });
}

//Quầy
function getOrderQuay() {
    let url = "/api/quay/GetOrderQuay?date=" + $("#dateDV").val()
    $.ajax({
        type: "GET",
        url: url,
        success: function (data) {
            let html = ""
            let htmlFooter = ""
            data.data.map(item => {
                html += `
                <tr>
                    <td>${item.TenDichVu}</td>
                    <td>${item.SoLuong}</td>
                    <td>${item.Gia} <sup>đ</sup></td>
                    <td>${item.ThanhTien} <sup>đ</sup></td>
                    <td>${formatdate(item.Ngay)}</td>
                </tr>
                `
            })

            htmlFooter = `
            <tr>
                <td colspan="3">Tổng</td>
                <td>${data.total[0].TongTien} <sup>đ</sup></td>
                <td></td>
            </tr>
                `

            $("#tbody-dichvu").html(html)
            $("#tfoot-dichvu").html(htmlFooter)
        },
        error: function (xhr, status, error) {
            // Code to handle any errors that may occur while connecting to the API
            console.error(status + ": " + error);
        }
    });
}

function GetDanhSachDichVu() {
    let url = "/api/quay/GetDanhSachDichVu"
    $.ajax({
        type: "GET",
        url: url,
        success: function (data) {
            let html = ""
            data.map(item => {
                html += `
                <li data-id=${item.ID} style="position: relative;">
                    ${item.TenDichVu} <span style="position: absolute;right: 10px;top: 0;">${item.Gia} <sup>đ</sup></span>
                </li>
                `
            })
            $("#lst-dichvu").html(html)
        },
        error: function (xhr, status, error) {
            // Code to handle any errors that may occur while connecting to the API
            console.error(status + ": " + error);
        }
    });
}

function orderQuay(obj) {
    return $.ajax({
        url: '/api/quay/postOrderQuay',
        type: 'post',
        dataType: 'json',
        data: JSON.stringify(obj),
        contentType: 'application/json',
        success: function (data) {
            Toast.fire({
                icon: 'success',
                title: 'Thêm thành công'
            })
            getOrderQuay()
        }
    });
}

$("#dateDV").on("change", function () {
    getOrderQuay()
})

$("#lst-dichvu").on("click", "li", function () {
    let title = `<p style="margin: 0">${formatdate($("#dateDV").val())}</p><p style="margin: 0">${$(this).text()}</p>`
    let dsOrder = []
    Swal.fire({
        title: title,
        input: "number",
        inputAttributes: {
            min: 1,  // Set the minimum value to 1
            autocapitalize: "off"
        },
        showCancelButton: true,
        confirmButtonText: "Xác nhận",
        cancelButtonText: "Hủy",
        inputValue: 1,
    }).then((result) => {
        if (result.isConfirmed) {
            
            if (result.value == "" || result.value <= 0) {
                Toast.fire({
                    icon: 'error',
                    title: 'Kiểm tra số lượng'
                })
            }
            else {
                let order = {
                    SanPhamID: $(this).data("id"),
                    SoLuong: result.value,
                    ngay: $("#dateDV").val()
                }
                dsOrder.push(order)
                orderQuay(dsOrder)
            }
        }
    });
})



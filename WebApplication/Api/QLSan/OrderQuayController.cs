using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Http;
using WebApplication.Models;

namespace WebApplication.Api.Todo
{
    [RoutePrefix("api/quay")]
    public class OrderQuayController : ApiController
    {
        [HttpGet]
        [Route("GetOrderQuay")]
        public dynamic GetOrderQuay(string date)
        {
            DataSet ds = new OrderQuayModel().GetOrderQuay(date);
            return new { data = ds.Tables[0], total = ds.Tables[1] };
        }

        [HttpGet]
        [Route("GetDanhSachDichVu")]
        public dynamic GetDanhSachDichVu()
        {
            DataTable tbl = new OrderQuayModel().GetDanhSachDichVu();
            string json = JsonConvert.SerializeObject(tbl, Formatting.Indented);
            JArray arr = JArray.Parse(json);
            return arr;
        }

        [HttpPost]
        [Route("postOrderQuay")]
        public dynamic postOrderQuay(DataTable obj)
        {
            string result = new OrderQuayModel().postOrderQuay(obj);
            return result;
        }
    }
}
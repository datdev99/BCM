using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Http;
using WebApplication.Models;

namespace WebApplication.Api.Todo
{
    [RoutePrefix("api/san")]
    public class OrderSanController : ApiController
    {
        [HttpGet]
        [Route("GetOrderSan")]
        public dynamic GetOrderSan(string date)
        {
            DataTable tbl = new OrderSanModel().GetOrderSan(date);
            string json = JsonConvert.SerializeObject(tbl, Formatting.Indented);
            JArray arr = JArray.Parse(json);
            return arr;
        }

        [HttpPost]
        [Route("postDatSan")]
        public dynamic postDatSan(DataTable obj)
        {
            string result = "";
            if (obj.Rows.Count > 0)
            {
                string san = obj.Rows[0]["san"].ToString();
                string ngay = obj.Rows[0]["ngay"].ToString();
                DataTable tbl = KiemTraSan(san, ngay);
                if(tbl.Rows.Count > 0)
                {
                    bool _checkSan = false;
                    foreach(DataRow row in obj.Rows)
                    {
                        DataRow rs = tbl.AsEnumerable().Where(x => 
                            (Convert.ToInt32(x["tugio"]) < Convert.ToInt32(row["tugio"]) + Convert.ToInt32(row["soluong"]) &&
                            Convert.ToInt32(row["tugio"]) + Convert.ToInt32(row["soluong"]) < Convert.ToInt32(x["dengio"])) ||
                            Convert.ToInt32(x["tugio"]) == Convert.ToInt32(row["tugio"])
                        ).FirstOrDefault();
                        if(rs != null)
                        {
                            _checkSan = true;
                        }
                    }
                    if(_checkSan == true)
                    {
                        return "false";
                    }
                    else
                    {
                        result = new OrderSanModel().postDatSan(obj);
                    }
                }
                else
                {
                    result = new OrderSanModel().postDatSan(obj);
                }
            }
            //string result = new OrderSanModel().postDatSan(obj);
            return result; 
        }

        [HttpGet]
        [Route("KiemTraSan")]
        public dynamic KiemTraSan(string san, string date)
        {
            DataTable tbl = new OrderSanModel().KiemTraSan(san, date);
            //string json = JsonConvert.SerializeObject(tbl, Formatting.Indented);
            //JArray arr = JArray.Parse(json);
            return tbl;
        }
    }
}
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
    [RoutePrefix("api/libs")]
    public class LibsController : ApiController
    {
        [HttpGet]
        [Route("GetNgay")]
        public dynamic GetNgay(string month, string year, string name)
        {
            DataTable tbl = new LibsModel().GetNgay(month, year, name);
            string json = JsonConvert.SerializeObject(tbl, Formatting.Indented);
            JArray arr = JArray.Parse(json);
            return arr;
        }
    }
}
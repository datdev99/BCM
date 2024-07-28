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
    [RoutePrefix("api/service")]
    public class ServiceController : ApiController
    {

        [HttpPost]
        [Route("add")]
        public dynamic AddService(DataTable obj)
        {
            
            if(obj.Rows.Count > 0)
            {
                DataTable tbl = GetService();
                foreach (DataRow row in obj.Rows)
                {
                    string MaDichVu = RemoveDiacriticsAndWhitespace(row["TenDichVu"].ToString());
                    DataRow rs = tbl.AsEnumerable().Where(x => x["MaDichVu"].ToString() == MaDichVu).FirstOrDefault();
                    if(rs == null)
                    {
                        row["MaDichVu"] = MaDichVu;
                    }
                    else
                    {
                        Random random = new Random();
                        MaDichVu = MaDichVu + random.Next(1, 9999);
                        row["MaDichVu"] = MaDichVu;
                    }
                }
                return obj;
            }
            return "false";
            //string result = new OrderQuayModel().postOrderQuay(obj);
            //return result;
        }

        [HttpGet]
        [Route("GetService")]
        public dynamic GetService()
        {
            DataTable tbl = new ServiceModel().GetService();
            return tbl;
        }

        public static string RemoveDiacriticsAndWhitespace(string input)
        {
            if (string.IsNullOrEmpty(input))
                return input;

            string upper = input.ToUpper();
            // Loại bỏ dấu
            string normalizedString = input.Normalize(NormalizationForm.FormD);
            StringBuilder stringBuilder = new StringBuilder();

            foreach (char c in normalizedString)
            {
                UnicodeCategory unicodeCategory = CharUnicodeInfo.GetUnicodeCategory(c);
                if (unicodeCategory != UnicodeCategory.NonSpacingMark)
                {
                    stringBuilder.Append(c);
                }
            }

            // Kết quả sau khi loại bỏ dấu
            string stringWithoutDiacritics = stringBuilder.ToString().Normalize(NormalizationForm.FormC);

            // Loại bỏ khoảng trắng
            string result = stringWithoutDiacritics.Replace(" ", "");

            return result;
        }
    }
}
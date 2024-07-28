using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace WebApplication.Models
{
    public class LibsModel
    {
        public DataTable GetNgay(string month, string year, string name)
        {
            SqlConnection _cnn = null;

            try
            {
                _cnn = SqlHelper.GetConnection();
                SqlCommand cmd = new SqlCommand("sp_getngay", _cnn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Action", "GET");
                cmd.Parameters.AddWithValue("@Month", month);
                cmd.Parameters.AddWithValue("@Year", year);
                cmd.Parameters.AddWithValue("@Name", name);
                using (SqlDataAdapter adt = new SqlDataAdapter(cmd))
                {
                    DataTable tb = new DataTable();
                    adt.Fill(tb);
                    return tb;
                }
            }

            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally { if (_cnn != null) { _cnn.Close(); _cnn.Dispose(); } }
        }
    }
}
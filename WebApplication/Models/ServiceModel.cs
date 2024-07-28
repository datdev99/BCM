using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace WebApplication.Models
{
    public class ServiceModel
    {
        public dynamic GetService()
        {
            SqlConnection _cnn = null;

            try
            {
                _cnn = SqlHelper.GetConnection();
                SqlCommand cmd = new SqlCommand("sp_service", _cnn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Action", "GetService");
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

        public string AddService(DataTable tb)
        {
            SqlConnection _cnn = null;

            try
            {
                _cnn = SqlHelper.GetConnection();
                SqlCommand cmd = new SqlCommand("sp_orderQuay", _cnn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Action", "postOrderQuay");
                cmd.Parameters.AddWithValue("@Ngay", "");
                cmd.Parameters.AddWithValue("@TypeTable", tb);
                cmd.ExecuteNonQuery();
                return "True";
            }

            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally { if (_cnn != null) { _cnn.Close(); _cnn.Dispose(); } }
        }
    }
}
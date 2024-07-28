using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace WebApplication.Models
{
    public class OrderSanModel
    {
        public DataTable GetOrderSan(string date)
        {
            SqlConnection _cnn = null;

            try
            {
                _cnn = SqlHelper.GetConnection();
                SqlCommand cmd = new SqlCommand("sp_ordersan", _cnn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Action", "GetOrderSan");
                cmd.Parameters.AddWithValue("@Ngay", date);
                cmd.Parameters.AddWithValue("@San", "");
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

        public DataTable KiemTraSan(string san, string date)
        {
            SqlConnection _cnn = null;

            try
            {
                _cnn = SqlHelper.GetConnection();
                SqlCommand cmd = new SqlCommand("sp_ordersan", _cnn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Action", "KiemTraSan");
                cmd.Parameters.AddWithValue("@Ngay", date);
                cmd.Parameters.AddWithValue("@San", san);
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

        public string postDatSan(DataTable tb)
        {
            SqlConnection _cnn = null;

            try
            {
                _cnn = SqlHelper.GetConnection();
                SqlCommand cmd = new SqlCommand("sp_ordersan", _cnn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Action", "postDatSan");
                cmd.Parameters.AddWithValue("@Ngay", "");
                cmd.Parameters.AddWithValue("@San", "");
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
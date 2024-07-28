using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace WebApplication.Models
{
    public class SqlHelper
    {
        public static readonly string StrConnectionString = ConfigurationManager.ConnectionStrings["strCnn_ln"].ConnectionString;
        public static SqlConnection GetConnection()
        {
            SqlConnection connection = new SqlConnection(StrConnectionString);
            if (connection.State == ConnectionState.Closed)
            {
                connection.Open();
            }
            return connection;
        }
    }
}
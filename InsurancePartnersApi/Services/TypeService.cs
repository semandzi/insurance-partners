using InsurancePartnersApi.Models;
using System.Numerics;

namespace InsurancePartnersApi.Services
{
    public class TypeService
    {
        public decimal ToDecimal(string number)
        {
            if (decimal.TryParse(number.ToString(), out decimal decimalNumber))
            {
                return decimalNumber;
            }
            return 0;
        }
    }
}

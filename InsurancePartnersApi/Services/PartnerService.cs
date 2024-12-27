using InsurancePartnersApi.Models;
using System.Numerics;

namespace InsurancePartnersApi.Services
{
    public class PartnerService
    {
        public Partner AdjustPartnerBeforeSaving(Partner partner)
        {
            if (decimal.TryParse(partner.PartnerNumber.ToString(), out decimal partnerNumber))
            {
                partner.PartnerNumber = partnerNumber;  // or you can store it as BigInteger
            }
            return partner;
        }
    }
}

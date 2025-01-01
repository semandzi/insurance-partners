using InsurancePartnersApi.Models;
using InsurancePartnersApi.Repositories;
using InsurancePartnersApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace InsurancePartnersApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PolicyController : ControllerBase
    {
        private readonly IGenericRepository<Policy> _repository;
        private readonly TypeService _policyService;

        public PolicyController(IGenericRepository<Policy> repository, TypeService policyService)
        {
            _repository = repository;
            _policyService = policyService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var query = "SELECT * FROM Policy";
            var policies = await _repository.GetAllAsync(query);
            return Ok(policies);
        }

        [HttpPost]
        public async Task<bool> Add([FromBody] Policy policy)
        {
            var policyAmount = _policyService.ToDecimal(policy.PolicyAmount.ToString());
            policy.PolicyAmount = policyAmount;
            
            var query = @"INSERT INTO Policy (PolicyNumber, PolicyAmount, PartnerId) 
                      VALUES (@PolicyNumber, @PolicyAmount, @PartnerId)";
            var result = await _repository.ExecuteAsync(query, policy);
            return result > 0;
        }

        [HttpPut("{id}")]
        public async Task<bool> Update([FromRoute] int id, [FromBody] Policy policy)
        {
            var query = @"
            UPDATE Policy
            SET
                PolicyNumber = @PolicyNumber,
                PolicyAmount = @PolicyAmount
            WHERE Id = @Id";
            var result = await _repository.ExecuteAsync(query, policy);
            return result > 0;
        }

        [HttpDelete("{id}")]
        public async Task<bool> Delete([FromRoute] int id)
        {
            var query = "DELETE FROM Policy WHERE Id = @Id";
            var result = await _repository.ExecuteAsync(query, new { id });
            return result > 0;
        }
    }
}

using InsurancePartnersApi.Models;
using InsurancePartnersApi.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace InsurancePartnersApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PolicyController : ControllerBase
    {
        private readonly IGenericRepository<Policy> _repository;

        public PolicyController(IGenericRepository<Policy> repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var query = "SELECT * FROM Policy";
            var policies = await _repository.GetAllAsync(query);
            return Ok(policies);
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] Policy policy)
        {
            var query = @"INSERT INTO Policy (PolicyNumber, PolicyAmount, PartnerId) 
                      VALUES (@PolicyNumber, @PolicyAmount, @PartnerId)";
            await _repository.ExecuteAsync(query, policy);
            return Ok();
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

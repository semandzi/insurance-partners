﻿using InsurancePartnersApi.Models;
using InsurancePartnersApi.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;

namespace InsurancePartnersApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PartnerController : ControllerBase
    {
        private readonly IGenericRepository<Partner> _repository;

        public PartnerController(IGenericRepository<Partner> repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var query = "SELECT * FROM Partner ORDER BY CreatedAtUtc DESC";
            var partners = await _repository.GetAllAsync(query);
            return Ok(partners);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var query = "SELECT * FROM Partner WHERE Id = @Id";
            var partner = await _repository.GetByIdAsync(query, new { Id = id });
            if (partner == null) return NotFound();
            return Ok(partner);
        }

        [HttpPost]
        public async Task<bool> Add([FromBody] Partner partner)
        {
            partner.CreatedAtUtc = DateTime.UtcNow;
            var query = @"INSERT INTO Partner (FirstName, LastName, Address, PartnerNumber, PartnerTypeId, CreatedAtUtc, CreatedByUser, IsForeign, ExternalCode, Gender) 
                      VALUES (@FirstName, @LastName, @Address, @PartnerNumber, @PartnerTypeId, GETUTCDATE(), @CreatedByUser, @IsForeign, @ExternalCode, @Gender)";            
            var result = await _repository.ExecuteAsync(query, partner);
            return result > 0 ;
        }

        [HttpPut("{id}")]
        public async Task<bool> Update( [FromRoute]int id, [FromBody] Partner partner) {
            var query = @"
            UPDATE Partner
            SET
                FirstName = @FirstName,
                LastName = @LastName,
                Address = @Address,
                PartnerNumber = @PartnerNumber,
                CroatianPIN = @CroatianPIN,
                PartnerTypeId = @PartnerTypeId,
                IsForeign = @IsForeign,
                ExternalCode = @ExternalCode,
                Gender = @Gender
            WHERE Id = @Id";

            var result = await _repository.ExecuteAsync(query, partner);
            return result > 0;
        }

        [HttpDelete("{id}")]
        public async Task<bool> Delete([FromRoute]int id) {
            var query = "DELETE FROM Partner WHERE Id = @Id";
            var result = await _repository.ExecuteAsync(query, new { id});
            return result > 0;
        }
    }
}
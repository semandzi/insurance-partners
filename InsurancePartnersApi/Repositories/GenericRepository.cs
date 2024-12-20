using System.Data;
using Dapper;
using InsurancePartnersApi.Data;

namespace InsurancePartnersApi.Repositories
{

    public interface IGenericRepository<T> where T : class
    {
        Task<IEnumerable<T>> GetAllAsync(string query);  // Get all entities of type T
        Task<T> GetByIdAsync(string query, object parameters); // Get an entity by its ID
        Task<int> ExecuteAsync(string query, object parameters);         // Get an entity by its ID        
    }

    public class GenericRepository<T>: IGenericRepository<T> where T : class
    {
        private readonly DatabaseContext _context;
        public GenericRepository(DatabaseContext context) {
            _context = context;
        }

        public async Task<IEnumerable<T>> GetAllAsync(string query) {
            var connection = _context.GetConnection;
            return await connection.QueryAsync<T>(query);
        }

        public async Task<T> GetByIdAsync(string query, object parameters) {
            var connection = _context.GetConnection;
            return await connection.QueryFirstOrDefaultAsync<T>(query, parameters);
        }

        public async Task<int> ExecuteAsync(string query, object parameters) {
            var connection = _context.GetConnection;
            return await connection.ExecuteAsync(query, parameters);
        }
    }
}

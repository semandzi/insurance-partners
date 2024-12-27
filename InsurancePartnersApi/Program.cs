using InsurancePartnersApi.Data;
using InsurancePartnersApi.Repositories;
using InsurancePartnersApi.Services;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = WebApplication.CreateBuilder(args);

// Add CORS services to the container
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost", policy =>
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod());
});

// Add services to the container.
builder.Services.AddSingleton<IConfiguration>(builder.Configuration);// Register IConfiguration for DI
builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));// Register the GenericRepository
builder.Services.AddScoped<PartnerService>();//Register Partner Service
builder.Services.AddScoped<SqlConnection>(provider =>
{
    return new SqlConnection(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddScoped<DatabaseContext>();// Register DatabaseContext as a scoped service

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

// Use CORS
app.UseCors("AllowLocalhost");

app.MapControllers();

app.Run();

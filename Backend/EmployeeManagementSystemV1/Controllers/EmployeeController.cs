using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class EmployeeController : ControllerBase
{
    private readonly AppDbContext _context;

    public EmployeeController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult Get()
    {
        return Ok(_context.Employees.ToList());
    }

    [HttpPost]
    public IActionResult Post(Employee emp)
    {
        try
        {
            emp.Id = 0; // 🔥 important
            _context.Employees.Add(emp);
            _context.SaveChanges();

            return Ok(emp);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message); // 🔥 shows error if any
        }
    }

    [HttpPut("{id}")]
    public IActionResult Put(int id, Employee updated)
    {
        var emp = _context.Employees.Find(id);
        if (emp == null) return NotFound();

        emp.Name = updated.Name;
        emp.Role = updated.Role;
        emp.Salary = updated.Salary;

        _context.SaveChanges();
        return Ok();
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var emp = _context.Employees.Find(id);
        if (emp == null) return NotFound();

        _context.Employees.Remove(emp);
        _context.SaveChanges();
        return Ok();
    }
}
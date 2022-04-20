using LoyallaApi.Context;
using LoyallaApi.DBModels;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace LoyallaApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OptionsController : ControllerBase
    {
        public readonly LoyallaContext _context;

        public OptionsController(LoyallaContext context)
        {
            _context = context;
        }

        // GET: api/<OptionsController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<OptionsController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<OptionsController>
        [HttpPost, Route("addOption")]
        public async void addOptions([FromBody] Options option)
        {
            
            _context.Options_tbl.Add(option);
            await _context.SaveChangesAsync();
        }

        // PUT api/<OptionsController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }   

        //// DELETE api/<OptionsController>/5
        //[HttpDelete("{id}"), Route("deleteOption")]
        //public async Task<string> Delete(int id)
        //{
        //    var optionDetail = _context.Options_tbl.Where(x => x.Id == id).FirstOrDefault();
        //    if (optionDetail == null)
        //    {
        //        return "Bad Request";
        //    }
        //    _context.Options_tbl.Remove(optionDetail);
        //    await _context.SaveChangesAsync();
        //    return "Deleted";
        //}
    }
}

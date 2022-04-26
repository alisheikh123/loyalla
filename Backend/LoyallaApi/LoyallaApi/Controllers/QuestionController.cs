using LoyallaApi.Context;
using LoyallaApi.DBModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LoyallaApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionController : ControllerBase
    {

        public readonly LoyallaContext _context;

        public QuestionController(LoyallaContext context)
        {
            _context = context;
        }
        [HttpGet, Route("GetPaperById")]
        public async Task<IList<Paper>> GetPaperById(int Id)
        {
            return await _context.Paper_tbl.Where(x=>x.Id==Id).ToListAsync();
        }
        [HttpGet, Route("GetAllPaper")]
        public async Task<IList<Paper>> GetPaper()
        {
            return await _context.Paper_tbl.ToListAsync();
        }
        [HttpGet,Route("GetAllQuestion")]
        public async Task<IList<Questions>> Get() 
        {
            return await _context.Question_tbl.ToListAsync();
        }

        [HttpPost, Route("addQuestion")]
        public async Task<ActionResult<Questions>> addQuestion(Questions questions)
        {
            var CurrentDateTime = DateTime.Now;
            questions.CreationDateTime = CurrentDateTime;
            _context.Question_tbl.Add(questions);
            await _context.SaveChangesAsync();
            return Ok(questions);

        }
        [HttpPost, Route("addPaper")]
        public async Task<ActionResult<Paper>> addPaper(Paper paper)
        {
            _context.Paper_tbl.Add(paper);
            await _context.SaveChangesAsync();
            return Ok(paper);

        }
        //[HttpDelete, Route("DeleteQuestion")]
        //public async Task<ActionResult<Questions>> delete(int questionId)
        //{
        //    var questionDetail = _context.Question_tbl.Where(x => x.Question_Id == questionId).FirstOrDefault();
        //    if (questionDetail == null)
        //    {
        //        return Ok("Bad Request");
        //    }
        //    _context.Question_tbl.Remove(questionDetail);
        //    await _context.SaveChangesAsync();
        //    return Ok("Deleted");
        //}


        [HttpPut, Route("UpdateQuestion")]
        public async Task<ActionResult<Questions>> updateQuestion([FromBody] Questions quest, int Question_Id)
        {
            var CurrentDateTime = DateTime.Now;
            quest.CreationDateTime = CurrentDateTime;
            if (Question_Id == null)
            {
                return Ok("BadRequest");
            }
            _context.Entry(quest).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return Ok("Updated");

        }

    }
}

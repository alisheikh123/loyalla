using AutoMapper;
using ExcelDataReader;
using LoyallaApi.Context;
using LoyallaApi.DBModels;
using LoyallaApi.DBModels.DTO;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OfficeOpenXml;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;

namespace LoyallaApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoyallaController : ControllerBase
    {
        public readonly LoyallaContext _context;
        private readonly IMapper _objectMapper;
        public LoyallaController(LoyallaContext context, IMapper objectMapper)
        {
            _context = context;
            _objectMapper = objectMapper;
        }

        [HttpPost, Route("AddCase")]
        public async Task<IActionResult> addCase([FromForm] caseDto cases)
        {
            var result = _objectMapper.Map<caseDto, Cases>(cases);
            result.CreationDateTime = DateTime.Now;
            _context.Case_tbl.Add(result);
            await _context.SaveChangesAsync();
            int caseId = result.Case_Id; 


            if (cases.file != null)
            {
                string path = Path.Combine(Directory.GetCurrentDirectory(), "Upload");
                if (!Directory.Exists(path))
                {
                    Directory.CreateDirectory(path);
                }
                path = Path.Combine(path, Path.GetFileName(cases.file.FileName));
                using (FileStream stream = new FileStream(path, FileMode.Create))
                {
                    cases.file.CopyTo(stream);
                }
                FileInfo file = new FileInfo(path);

                using (ExcelPackage package = new ExcelPackage(file))
                {
                    ExcelPackage.LicenseContext = LicenseContext.Commercial;
                    var papersList = new List<Paper>();
                    var questionsList = new List<Questions>();
                    var optionsList = new List<Options>();
                    var anwserlist = new List<Anwser>();

                    // add a new worksheet to the empty workbook

                    ExcelWorksheet paper = package.Workbook.Worksheets[0];
                    ExcelWorksheet question = package.Workbook.Worksheets[1];
                    ExcelWorksheet option = package.Workbook.Worksheets[2];
                    ExcelWorksheet anwsersheet = package.Workbook.Worksheets[3];


                    var paperRowCount = paper.Dimension.Rows;
                    var questionRowCount = question.Dimension.Rows;
                    var optionRowCount = option.Dimension.Rows;
                    var anwserRowCount = anwsersheet.Dimension.Rows;

                    // Upload paper
                    for (int row = 2; row <= paperRowCount; row++)
                    {
                        papersList.Add(new Paper
                        {
                            PaperName = paper.Cells[row, 1].Value.ToString().Trim(),
                            Title = paper.Cells[row, 2].Value.ToString().Trim(),
                            Description = paper.Cells[row, 3].Value.ToString().Trim(),
                            CaseId = caseId
                        });
                    }
                    _context.Paper_tbl.AddRange(papersList);
                    await _context.SaveChangesAsync();


                    foreach (var p in papersList)
                    {
                        // Upload Questions
                        for (int row = 2; row <= questionRowCount; row++)
                        {
                            questionsList.Add(new Questions
                            {
                                Topic = question.Cells[row, 1].Value.ToString().Trim(),
                                QuestionName = question.Cells[row, 2].Value.ToString().Trim(),
                                PaperId = p.Id,
                                Description = question.Cells[row, 4].Value.ToString().Trim(),
                            });
                        }
                    }
                    // Upload Options
                    for (int row = 2; row <= optionRowCount; row++)
                    {
                        optionsList.Add(new Options
                        {
                            QuestionId = int.Parse(option.Cells[row, 1].Value.ToString().Trim()),
                            OptionName = option.Cells[row, 2].Value.ToString().Trim(),
                        });
                    }

                    // Upload Anwsers
                    for (int row = 2; row <= anwserRowCount; row++)
                    {
                        anwserlist.Add(new Anwser
                        {
                            OptionId = int.Parse(anwsersheet.Cells[row, 1].Value.ToString().Trim()),
                            IsAnwsers = int.Parse(anwsersheet.Cells[row, 2].Value.ToString().Trim()),
                        });
                    }
                    _context.Question_tbl.AddRange(questionsList);
                    _context.Options_tbl.AddRange(optionsList);
                    _context.Anwser_tbl.AddRange(anwserlist);

                }
                await _context.SaveChangesAsync();
                return Ok();
            }

            return BadRequest();

        }

        [HttpGet, Route("AdminCaseList")]
        public async Task<List<CaseList>> AdminCaseList()
        {
            var response = new EntityResponseModel<object>();
            var CaseList = (from p in _context.Paper_tbl
                           join c in _context.Case_tbl on p.CaseId equals c.Case_Id
                           select new CaseList
                           { 
                           CaseName = c.Title,
                           Comments = c.Description,
                           CreationDate = c.CreationDateTime,
                           CaseId = p.CaseId,
                           PaperId = p.Id,
                           PaperName = p.PaperName
                           
                           }).ToList();

            return CaseList;
        }

        [HttpGet, Route("StudentPaperList")]
        public async Task<List<CaseList>> StudentPaperList()
        {
            var response = new EntityResponseModel<object>();
            var CaseList = (from p in _context.Paper_tbl
                            join c in _context.Case_tbl on p.CaseId equals c.Case_Id
                            select new CaseList
                            {
                                CaseName = c.Title,
                                Comments = c.Description,
                                CreationDate = c.CreationDateTime,
                                CaseId = p.CaseId,
                                PaperId = p.Id,
                                PaperName = p.PaperName

                            }).ToList();

            return CaseList;
        }

        [HttpDelete, Route("DeleteCase")]
        public async Task<ActionResult<Cases>> delCase(int Case_Id)
        {
            var CaseData = _context.Case_tbl.Where(x => x.Case_Id == Case_Id).FirstOrDefault();
            if (CaseData == null)
            {
                return Ok("Bad Request");
            }
            _context.Case_tbl.Remove(CaseData);
            await _context.SaveChangesAsync();
            return Ok("Deleted");
        }


        [HttpPost, Route("AddQuestion")]
        public async Task<ActionResult<Questions>> addQuest([FromForm] Questions quest)
        {
            var CurrentDateTime = DateTime.Now;
            quest.CreationDateTime = CurrentDateTime;
            _context.Question_tbl.Add(quest);
            await _context.SaveChangesAsync();
            return Ok(quest);
        }

       

        [HttpGet, Route("GetAnwsers")]
        public async Task<ActionResult<List<Anwser>>> getAnwsers()
        {
            return _context.Anwser_tbl.OrderBy(x => x.OptionId).ToList();
        }

        [HttpGet, Route("GetQuestionsDetail")]
        public async Task<List<QuestionsOptionsList>> getQuestions()
        {
            var optionsList = new List<QuestionsOptionsList>();
            var paper = _context.Paper_tbl.Where(x => x.Id == 1).Select(x => new { x.Id, x.PaperName, x.Title }).FirstOrDefault();
            var questions = _context.Question_tbl.Where(x => x.PaperId == paper.Id).ToList();
            foreach (var item in questions)
            {
                var options = _context.Options_tbl.Where(x => x.QuestionId == item.QuestionId).OrderBy(x => x.QuestionId).ToList();
                foreach (var item2 in options)
                {
                    optionsList.Add(new QuestionsOptionsList
                    {
                        QuestionId = item.QuestionId,
                        PaperName = paper.PaperName,
                        Topic = item.Topic,
                        QuestionName = item.QuestionName,
                        Description = item.Description,
                        OptionName = item2.OptionName
                    });
                }
            }
            return optionsList;
        }


        [HttpGet, Route("getQuestionDetailWithAnwser")]
        public async Task<EntityResponseModel<object>> getQuestionDetailWithAnwser(int paperId)
        {

            var paperList = new Paper();
            var paper = _context.Paper_tbl.Where(x => x.Id == paperId).FirstOrDefault();
            var questions = _context.Question_tbl.Where(x => x.PaperId == paper.Id).ToList();


            foreach (var item in questions)
            {
                var options = _context.Options_tbl.Where(x => x.QuestionId == item.QuestionId).ToList();

                //foreach (var op in options)
                //{
                //var anwser = _context.Anwser_tbl.Where(x => x.OptionId == options.Id).ToList();
                paperList.Id = paper.Id;
                paperList.PaperName = paper.PaperName;
                paperList.Questions.Add(
                         new Questions
                         {
                             QuestionId = item.QuestionId,
                             Topic = item.Topic,
                             Description = item.Description,
                             QuestionName = item.QuestionName,
                             Options = options,
                                 //Options = new Options[]
                                 //{
                                 //    new Options
                                 //    {
                                 //        Id = op.Id,
                                 //        OptionName = op.OptionName,
                                 //        Anwsers = anwser,
                                 //    }
                                 //}
                             });
                // };
                //});


                //}
            }
            return new EntityResponseModel<object>
            {
                Data = paperList,
            };
        }

        [HttpGet, Route("getQuestionDetailWithoutAnwser")]
        public async Task<EntityResponseModel<object>> getQuestionDetailWithoutAnwser(int paperId)
        {

            var paperList = new Paper();
            var paper = _context.Paper_tbl.Where(x => x.Id == paperId).FirstOrDefault();
            var questions = _context.Question_tbl.Where(x => x.PaperId == paper.Id).ToList();


            foreach (var item in questions)
            {
                var options = _context.Options_tbl.Where(x => x.QuestionId == item.QuestionId).ToList();
                    paperList.Id = paper.Id;
                    paperList.PaperName = paper.PaperName;
                    paperList.Questions.Add(
                             new Questions
                             {
                                     QuestionId = item.QuestionId,
                                     Topic = item.Topic,
                                     Description = item.Description,
                                     QuestionName =item.QuestionName,
                                     Options = options,
                             });
            }
            return new EntityResponseModel<object>
            {
                Data = paperList,
            };
        }

    }
}

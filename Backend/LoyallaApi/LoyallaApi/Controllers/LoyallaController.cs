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
                    var papersList = new Paper();
                    var questionsList = new Questions();
                    var optionsList = new Options();
                    var anwserlist = new Anwser();

                    // add a new worksheet to the empty workbook

                    ExcelWorksheet paper = package.Workbook.Worksheets[0];
                    ExcelWorksheet question = package.Workbook.Worksheets[1];
                    ExcelWorksheet option = package.Workbook.Worksheets[2];
                    ExcelWorksheet anwser = package.Workbook.Worksheets[3];


                    var paperRowCount = paper.Dimension.Rows;
                    var questionRowCount = question.Dimension.Rows;
                    var optionRowCount = option.Dimension.Rows;
                    var anwserRowCount = anwser.Dimension.Rows;

                    #region Upload Paper
                    for (int row = 2; row <= paperRowCount; row++)
                    {
                        papersList.PaperName = paper.Cells[row, 1].Value.ToString().Trim();
                        papersList.Title = paper.Cells[row, 2].Value.ToString().Trim();
                        papersList.Description = paper.Cells[row, 3].Value.ToString().Trim();
                        papersList.CaseId = caseId;


                        var paperId = await _context.Paper_tbl.FindAsync(papersList.Id);
                        if (paperId != null)
                        {
                            papersList.Id++;
                            _context.Paper_tbl.Add(papersList);
                            await _context.SaveChangesAsync();
                            // Upload Questions
                            #region Upload Questions
                            for (int questionRow = 2; questionRow <= questionRowCount; questionRow++)
                            {
                                int questionserialNo = int.Parse(question.Cells[questionRow, 1].Value.ToString().Trim());
                                questionsList.Topic = question.Cells[questionRow, 2].Value.ToString().Trim();
                                questionsList.QuestionName = question.Cells[questionRow, 3].Value.ToString().Trim();
                                questionsList.PaperId = papersList.Id;
                                questionsList.Description = question.Cells[questionRow, 4].Value.ToString().Trim();
                                var questionId = await _context.Question_tbl.FindAsync(questionsList.QuestionId);

                                if (questionId != null)
                                {
                                    questionsList.QuestionId++;
                                    await _context.Question_tbl.AddAsync(questionsList);
                                    await _context.SaveChangesAsync();

                                    #region Add Options
                                    for (int optionRow = 2; optionRow <= optionRowCount; optionRow++)
                                    {
                                        int questionForignSerialNo = int.Parse(option.Cells[optionRow, 1].Value.ToString().Trim());
                                        if (questionserialNo == questionForignSerialNo)
                                        {
                                            optionsList.QuestionId = questionsList.QuestionId;
                                            optionsList.OptionName = option.Cells[optionRow, 2].Value.ToString().Trim();
                                            var optionId = await _context.Options_tbl.FindAsync(optionsList.Id);
                                            if (optionId != null)
                                            {
                                                optionsList.Id++;
                                                await _context.Options_tbl.AddAsync(optionsList);
                                                await _context.SaveChangesAsync();
                                            }
                                            else
                                            {
                                                await _context.Options_tbl.AddAsync(optionsList);
                                                await _context.SaveChangesAsync();
                                            }
                                        }

                                    }
                                    #endregion
                                    // Add Anwsers
                                    #region Add Anwsers
                                    for (int anwserRow = 2; anwserRow <= anwserRowCount; anwserRow++)
                                    {
                                        int questionForignSerialNo = int.Parse(anwser.Cells[anwserRow, 1].Value.ToString().Trim());
                                        if (questionserialNo == questionForignSerialNo)
                                        {
                                            anwserlist.QuestionId = questionsList.QuestionId;
                                            anwserlist.IsAnwsers = int.Parse(anwser.Cells[anwserRow, 2].Value.ToString().Trim());

                                            var anwserId = await _context.Anwser_tbl.FindAsync(anwserlist.Id);
                                            if (anwserId != null)
                                            {
                                                anwserlist.Id++;
                                                await _context.Anwser_tbl.AddAsync(anwserlist);
                                                await _context.SaveChangesAsync();
                                            }
                                            else
                                            {
                                                await _context.Anwser_tbl.AddAsync(anwserlist);
                                                await _context.SaveChangesAsync();
                                            }
                                        }
                                    }
                                    #endregion

                                }
                                else
                                {

                                    await _context.Question_tbl.AddAsync(questionsList);
                                    await _context.SaveChangesAsync();

                                    #region Add Options
                                    for (int optionRow = 2; optionRow <= optionRowCount; optionRow++)
                                    {
                                        int questionForignSerialNo = int.Parse(option.Cells[optionRow, 1].Value.ToString().Trim());
                                        if (questionserialNo == questionForignSerialNo)
                                        {
                                            optionsList.QuestionId = questionsList.QuestionId;
                                            optionsList.OptionName = option.Cells[optionRow, 2].Value.ToString().Trim();
                                            var optionId = await _context.Options_tbl.FindAsync(optionsList.Id);
                                            if (optionId != null)
                                            {
                                                optionsList.Id++;
                                                await _context.Options_tbl.AddAsync(optionsList);
                                                await _context.SaveChangesAsync();
                                            }
                                            else
                                            {
                                                await _context.Options_tbl.AddAsync(optionsList);
                                                await _context.SaveChangesAsync();
                                            }
                                        }

                                    }
                                    #endregion

                                    #region Add Anwsers
                                    for (int anwserRow = 2; anwserRow <= anwserRowCount; anwserRow++)
                                    {
                                        int questionForignSerialNo = int.Parse(anwser.Cells[anwserRow, 1].Value.ToString().Trim());
                                        if (questionserialNo == questionForignSerialNo)
                                        {
                                            anwserlist.QuestionId = questionsList.QuestionId;
                                            anwserlist.IsAnwsers = int.Parse(anwser.Cells[anwserRow, 2].Value.ToString().Trim());

                                            var anwserId = await _context.Anwser_tbl.FindAsync(anwserlist.Id);
                                            if (anwserId != null)
                                            {
                                                anwserlist.Id++;
                                                await _context.Anwser_tbl.AddAsync(anwserlist);
                                                await _context.SaveChangesAsync();
                                            }
                                            else
                                            {
                                                await _context.Anwser_tbl.AddAsync(anwserlist);
                                                await _context.SaveChangesAsync();
                                            }
                                        }
                                    }
                                    #endregion
                                }
                            } 
                            #endregion
                        }
                        else
                        {
                            _context.Paper_tbl.Add(papersList);
                            await _context.SaveChangesAsync();
                            #region Upload Questions
                            // Upload Questions
                            for (int questionRow = 2; questionRow <= questionRowCount; questionRow++)
                            {
                                int questionserialNo = int.Parse(question.Cells[questionRow, 1].Value.ToString().Trim());
                                questionsList.Topic = question.Cells[questionRow, 2].Value.ToString().Trim();
                                questionsList.QuestionName = question.Cells[questionRow, 3].Value.ToString().Trim();
                                questionsList.PaperId = papersList.Id;
                                questionsList.Description = question.Cells[questionRow, 4].Value.ToString().Trim();
                                var questionId = await _context.Question_tbl.FindAsync(questionsList.QuestionId);

                                if (questionId != null)
                                {
                                    questionsList.QuestionId++;
                                    await _context.Question_tbl.AddAsync(questionsList);
                                    await _context.SaveChangesAsync();

                                    #region Upload Options
                                    for (int optionRow = 2; optionRow <= optionRowCount; optionRow++)
                                    {
                                        int questionForignSerialNo = int.Parse(option.Cells[optionRow, 1].Value.ToString().Trim());
                                        if (questionserialNo == questionForignSerialNo)
                                        {
                                            optionsList.QuestionId = questionsList.QuestionId;
                                            optionsList.OptionName = option.Cells[optionRow, 2].Value.ToString().Trim();
                                            var optionId = await _context.Options_tbl.FindAsync(optionsList.Id);
                                            if (optionId != null)
                                            {
                                                optionsList.Id++;
                                                await _context.Options_tbl.AddAsync(optionsList);
                                                await _context.SaveChangesAsync();
                                            }
                                            else
                                            {
                                                await _context.Options_tbl.AddAsync(optionsList);
                                                await _context.SaveChangesAsync();
                                            }
                                        }

                                    }
                                    #endregion

                                    #region Upload Anwsers
                                    // Upload Anwsers
                                    for (int anwserRow = 2; anwserRow <= anwserRowCount; anwserRow++)
                                    {
                                        int questionForignSerialNo = int.Parse(anwser.Cells[anwserRow, 1].Value.ToString().Trim());
                                        if (questionserialNo == questionForignSerialNo)
                                        {
                                            anwserlist.QuestionId = questionsList.QuestionId;
                                            anwserlist.IsAnwsers = int.Parse(anwser.Cells[anwserRow, 2].Value.ToString().Trim());

                                            var anwserId = await _context.Anwser_tbl.FindAsync(anwserlist.Id);
                                            if (anwserId != null)
                                            {
                                                anwserlist.Id++;
                                                await _context.Anwser_tbl.AddAsync(anwserlist);
                                                await _context.SaveChangesAsync();
                                            }
                                            else
                                            {
                                                await _context.Anwser_tbl.AddAsync(anwserlist);
                                                await _context.SaveChangesAsync();
                                            }
                                        }
                                    }
                                    #endregion

                                }
                                else
                                {

                                    try
                                    {
                                        await _context.Question_tbl.AddAsync(questionsList);
                                        await _context.SaveChangesAsync();
                                    }
                                    catch (Exception ex)
                                    {

                                        throw;
                                    }

                                    #region Upload Options
                                    for (int optionRow = 2; optionRow <= optionRowCount; optionRow++)
                                    {
                                        int questionForignSerialNo = int.Parse(option.Cells[optionRow, 1].Value.ToString().Trim());
                                        if (questionserialNo == questionForignSerialNo)
                                        {
                                            optionsList.QuestionId = questionsList.QuestionId;
                                            optionsList.OptionName = option.Cells[optionRow, 2].Value.ToString().Trim();
                                            var optionId = await _context.Options_tbl.FindAsync(optionsList.Id);
                                            if (optionId != null)
                                            {
                                                optionsList.Id++;
                                                await _context.Options_tbl.AddAsync(optionsList);
                                                await _context.SaveChangesAsync();
                                            }
                                            else
                                            {
                                                await _context.Options_tbl.AddAsync(optionsList);
                                                await _context.SaveChangesAsync();
                                            }
                                        }

                                    }
                                    #endregion

                                    #region Upload Anwsers
                                    for (int anwserRow = 2; anwserRow <= anwserRowCount; anwserRow++)
                                    {
                                        int questionForignSerialNo = int.Parse(anwser.Cells[anwserRow, 1].Value.ToString().Trim());
                                        if (questionserialNo == questionForignSerialNo)
                                        {
                                            anwserlist.QuestionId = questionsList.QuestionId;
                                            anwserlist.IsAnwsers = int.Parse(anwser.Cells[anwserRow, 2].Value.ToString().Trim());

                                            var anwserId = await _context.Anwser_tbl.FindAsync(anwserlist.Id);
                                            if (anwserId != null)
                                            {
                                                anwserlist.Id++;
                                                await _context.Anwser_tbl.AddAsync(anwserlist);
                                                await _context.SaveChangesAsync();
                                            }
                                            else
                                            {
                                                await _context.Anwser_tbl.AddAsync(anwserlist);
                                                await _context.SaveChangesAsync();
                                            }
                                        }
                                    }
                                    #endregion
                                }
                            } 
                            #endregion
                        }



                    } 
                    #endregion
                    return Ok();
                }
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

            List<Paper> paperagainstcase = new List<Paper>();
            List<Questions> questionagainstpaper = new List<Questions>();
            List<Options> optionsagainstquestions = new List<Options>();
            List<Anwser> anwserssagainstoptions = new List<Anwser>();
            var cases = _context.Case_tbl.Where(x => x.Case_Id == Case_Id).FirstOrDefault();
            if (cases == null)
            {
                return Ok("Bad Request");
            }
            else
            {
                paperagainstcase = _context.Paper_tbl.Where(x => x.CaseId == Case_Id).ToList();
                foreach (var p in paperagainstcase)
                {
                    questionagainstpaper = _context.Question_tbl.Where(x => x.PaperId == p.Id).ToList();
                    foreach (var q in questionagainstpaper)
                    {
                        optionsagainstquestions = _context.Options_tbl.Where(x => x.QuestionId == q.QuestionId).ToList();
                            anwserssagainstoptions = _context.Anwser_tbl.Where(x => x.QuestionId == q.QuestionId).ToList();
                        _context.Anwser_tbl.RemoveRange(anwserssagainstoptions);
                        _context.Options_tbl.RemoveRange(optionsagainstquestions);

                    }
                    _context.Question_tbl.RemoveRange(questionagainstpaper);
                }


                _context.Paper_tbl.RemoveRange(paperagainstcase);
                _context.Case_tbl.Remove(cases);
                await _context.SaveChangesAsync();
                return Ok("Deleted");
            }
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
            return _context.Anwser_tbl.OrderBy(x => x.QuestionId).ToList();
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

        [HttpGet, Route("GetCaseDetail")]
        public async Task<EntityResponseModel<Cases>> getCaseDetail(int caseId)
        {
            var caseDetail = new Cases();
            caseDetail =  _context.Case_tbl.Where(x => x.Case_Id.Equals(caseId)).FirstOrDefault();
            return new  EntityResponseModel<Cases>
            {
                Data = caseDetail,
            };
        }

    }
}

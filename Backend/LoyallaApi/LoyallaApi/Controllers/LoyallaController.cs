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
                        });
                    }



                    // Upload Questions
                    try
                    {
                        for (int row = 2; row <= questionRowCount; row++)
                        {
                            questionsList.Add(new Questions
                            {
                                Topic = question.Cells[row, 1].Value.ToString().Trim(),
                                QuestionName = question.Cells[row, 2].Value.ToString().Trim(),
                                PaperId = int.Parse(question.Cells[row, 3].Value.ToString().Trim()),
                                Description = question.Cells[row, 4].Value.ToString().Trim(),
                            });
                        }
                    }
                    catch (Exception ex)
                    {

                        throw;
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


                    _context.Paper_tbl.AddRange(papersList);
                    _context.Question_tbl.AddRange(questionsList);
                    _context.Options_tbl.AddRange(optionsList);
                    _context.Anwser_tbl.AddRange(anwserlist);

                }

                var result = _objectMapper.Map<caseDto, Cases>(cases);
                result.CreationDateTime = DateTime.Now;
                _context.Case_tbl.Add(result);

                await _context.SaveChangesAsync();

                return Ok();
            }

            return BadRequest();

        }

        [HttpGet ,Route("AdminCaseList")]
        public async Task<ActionResult<IEnumerable<Cases>>> adminCaseList()
        {
            var CaseList = _context.Case_tbl.ToArray();
            if(CaseList==null)
            {
                return Ok("Notfound");
            }
            return CaseList;
        }

        [HttpDelete ,Route("DeleteCase")]
        public async Task<ActionResult<Cases>> delCase(int Case_Id)
        {
            var CaseData = _context.Case_tbl.Where(x => x.Case_Id == Case_Id).FirstOrDefault();
            if(CaseData==null)
            {
                return Ok("Bad Request");
            }
            _context.Case_tbl.Remove(CaseData);
            await _context.SaveChangesAsync();
            return Ok("Deleted");
        }


        [HttpPost ,Route("AddQuestion")]
        public async Task<ActionResult<Questions>> addQuest ([FromForm] Questions quest)
        {
            var CurrentDateTime = DateTime.Now;
            quest.CreationDateTime = CurrentDateTime;
            _context.Question_tbl.Add(quest);
            await _context.SaveChangesAsync();
            return Ok(quest);
        }

        //[HttpGet ,Route("GetQuestionBYId")]
        //public async Task<ActionResult<Questions>> getQuest(int Question_Id)
        //{
        //    var questData=_context.Question_tbl.Where(x=>x.Question_Id == Question_Id).FirstOrDefault();
        //    if(questData==null)
        //    {
        //        return Ok("Bad Request");
        //    }
        //    return questData;
        //}

        //[HttpPut ,Route("UpdateQuestion")]
        //public async Task<ActionResult<Questions>> updateQuest([FromBody] Questions quest, int Question_Id)
        //{
        //    var CurrentDateTime = DateTime.Now;
        //    quest.CreationDateTime = CurrentDateTime;
        //    if (Question_Id==null)
        //    {
        //        return Ok("BadRequest");
        //    }
        //    _context.Entry(quest).State = EntityState.Modified;
        //    _context.SaveChangesAsync();
        //    return Ok("Updated");

        //}
        //[HttpDelete ,Route("DeleteQuestion")]
        //public async Task<ActionResult<Questions>> delQuest(int Question_Id)
        //{
        //    var questionData = _context.Question_tbl.Where(x => x.Question_Id == Question_Id).FirstOrDefault();
        //    if(questionData == null)
        //    {
        //        return Ok("Bad Request");
        //    }
        //    _context.Question_tbl.Remove(questionData);
        //    await _context.SaveChangesAsync();
        //    return Ok("Deleted");
        //}

        [HttpGet,Route("GetAnwsers")]
        public async Task<ActionResult<List<Anwser>>> getAnwsers() 
        {
        return _context.Anwser_tbl.OrderBy(x=>x.OptionId).ToList();
        }

        [HttpGet, Route("GetQuestionsDetail")]
        public async Task<List<QuestionsOptionsList>> getQuestions()
        {
            var optionsList = new List<QuestionsOptionsList>();
            var paper = _context.Paper_tbl.Where(x => x.Id == 1).Select(x => new { x.Id, x.PaperName, x.Title }).FirstOrDefault();
            var questions = _context.Question_tbl.Where(x => x.PaperId == paper.Id).ToList();
            foreach (var item in questions)
            {
                var options = _context.Options_tbl.Where(x=>x.QuestionId==item.QuestionId).OrderBy(x => x.QuestionId).ToList();
                foreach (var item2 in options)
                {
                    optionsList.Add(new QuestionsOptionsList
                    {
                        QuestionId = item.QuestionId,
                        QuestionName = item.QuestionName,
                        OptionName = item2.OptionName
                });
                }}
           return  optionsList;
        }




        //[Route("ReadFile")]
        //[HttpPost]
        //public string ReadFile()
        //{
        //    try
        //    {
        //        #region Variable Declaration  
        //        string message = "";
        //        HttpResponseMessage ResponseMessage = null;
        //        var httpRequest = HttpContext.Current.Request;
        //        DataSet dsexcelRecords = new DataSet();
        //        IExcelDataReader reader = null;
        //        HttpPostedFile Inputfile = null;
        //        Stream FileStream = null;
        //        #endregion

        //        #region Save Student Detail From Excel  
        //        using (dbCodingvilaEntities objEntity = new dbCodingvilaEntities())
        //        {
        //            if (httpRequest.File.Count > 0)
        //            {
        //                Inputfile = httpRequest.Files[0];
        //                FileStream = Inputfile.InputStream;

        //                if (Inputfile != null && FileStream != null)
        //                {
        //                    if (Inputfile.FileName.EndsWith(".xls"))
        //                        reader = ExcelReaderFactory.CreateBinaryReader(FileStream);
        //                    else if (Inputfile.FileName.EndsWith(".xlsx"))
        //                        reader = ExcelReaderFactory.CreateOpenXmlReader(FileStream);
        //                    else
        //                        message = "The file format is not supported.";

        //                    dsexcelRecords = reader.AsDataSet();
        //                    reader.Close();

        //                    if (dsexcelRecords != null && dsexcelRecords.Tables.Count > 0)
        //                    {
        //                        DataTable dtStudentRecords = dsexcelRecords.Tables[0];
        //                        for (int i = 0; i < dtStudentRecords.Rows.Count; i++)
        //                        {
        //                            Student objStudent = new Student();
        //                            objStudent.RollNo = Convert.ToInt32(dtStudentRecords.Rows[i][0]);
        //                            objStudent.EnrollmentNo = Convert.ToString(dtStudentRecords.Rows[i][1]);
        //                            objStudent.Name = Convert.ToString(dtStudentRecords.Rows[i][2]);
        //                            objStudent.Branch = Convert.ToString(dtStudentRecords.Rows[i][3]);
        //                            objStudent.University = Convert.ToString(dtStudentRecords.Rows[i][4]);
        //                            objEntity.Students.Add(objStudent);
        //                        }

        //                        int output = objEntity.SaveChanges();
        //                        if (output > 0)
        //                            message = "The Excel file has been successfully uploaded.";
        //                        else
        //                            message = "Something Went Wrong!, The Excel file uploaded has fiald.";
        //                    }
        //                    else
        //                        message = "Selected file is empty.";
        //                }
        //                else
        //                    message = "Invalid File.";
        //            }
        //            else
        //                ResponseMessage = Request.CreateResponse(HttpStatusCode.BadRequest);
        //        }
        //        return message;
        //        #endregion
        //    }
        //    catch (Exception)
        //    {
        //        throw;
        //    }
        //}

    }
}

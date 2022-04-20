using ExcelDataReader;
using LoyallaApi.Context;
using LoyallaApi.DBModels;
using LoyallaApi.DBModels.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
        public LoyallaController(LoyallaContext context)
        {
            _context = context; 
        }
 
        [HttpPost ,Route("AddCase")]
        public async Task<ActionResult<Cases>> addCase(Cases cas)
        {
            var CurrentDateTime = DateTime.Now;
            cas.CreationDateTime = CurrentDateTime;
            _context.Case_tbl.Add(cas);
            await _context.SaveChangesAsync();
            return Ok(cas);

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

        [HttpGet ,Route("GetQuestionBYId")]
        public async Task<ActionResult<Questions>> getQuest(int Question_Id)
        {
            var questData=_context.Question_tbl.Where(x=>x.Question_Id == Question_Id).FirstOrDefault();
            if(questData==null)
            {
                return Ok("Bad Request");
            }
            return questData;
        }

        [HttpPut ,Route("UpdateQuestion")]
        public async Task<ActionResult<Questions>> updateQuest([FromBody] Questions quest, int Question_Id)
        {
            var CurrentDateTime = DateTime.Now;
            quest.CreationDateTime = CurrentDateTime;
            if (Question_Id==null)
            {
                return Ok("BadRequest");
            }
            _context.Entry(quest).State = EntityState.Modified;
            _context.SaveChangesAsync();
            return Ok("Updated");

        }
        [HttpDelete ,Route("DeleteQuestion")]
        public async Task<ActionResult<Questions>> delQuest(int Question_Id)
        {
            var questionData = _context.Question_tbl.Where(x => x.Question_Id == Question_Id).FirstOrDefault();
            if(questionData == null)
            {
                return Ok("Bad Request");
            }
            _context.Question_tbl.Remove(questionData);
            await _context.SaveChangesAsync();
            return Ok("Deleted");
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

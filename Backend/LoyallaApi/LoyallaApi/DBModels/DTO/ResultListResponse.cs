using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LoyallaApi.DBModels.DTO
{
    public class ResultListResponse
    {
        public int StudentID { get; set; }
        public int CaseId { get; set; }
        public string StudentName { get; set; }
        public string Title { get; set; }
        public string StudentFeedback { get; set; }
        public DateTime? Date { get; set; }
        public int Attempts { get; set; }
        public string Grades { get; set; }
        public string Status { get; set; }
    }
}

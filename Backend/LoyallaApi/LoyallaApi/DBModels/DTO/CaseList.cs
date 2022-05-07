using System;

namespace LoyallaApi.DBModels.DTO
{
    public class CaseList
    {
        public string CaseName { get; set; }
        public string Comments { get; set; }
        public DateTime? CreationDate { get; set; }
        public int CaseId { get; set; }
        public int PaperId { get; set; }
        public string PaperName { get; set; }
    }
}

using System;

namespace LoyallaApi.DBModels.DTO
{
    public class AllSurviesDto
    {
        public bool IsTechnicalIssue { get; set; }
        public string TechincalIssueDescription { get; set; }
        public int Rate { get; set; }

        public bool IsUseFullLearningTool { get; set; }
        public string Comment { get; set; }
        public string Username { get; set; }
        public Nullable<System.DateTime> CreationDateTime { get; set; }
    }
}

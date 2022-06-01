using System;
using System.ComponentModel.DataAnnotations;

namespace LoyallaApi.DBModels
{
    public class Survey
    {
        [Key]
        public int Id{ get; set; }

        public bool  IsTechnicalIssue { get; set; }
        public string  TechincalIssueDescription { get; set; }
        public int  Rate { get; set; }

        public bool  IsUseFullLearningTool { get; set; }
        public string Comment { get; set; }
        public int StudentId { get; set; }
        public Nullable<System.DateTime> CreationDateTime { get; set; }
    }
}

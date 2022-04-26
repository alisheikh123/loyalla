using LoyallaApi.DBModels.Enum;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace LoyallaApi.DBModels
{
    public class Questions
    {
        [Key]
        public int QuestionId { get; set; }
        public string Topic { get; set; }
        public string QuestionName { get; set; }
        public int PaperId { get; set; }
        public Paper Paper { get; set; }
        public string Description { get; set; }
        public int Created_By { get; set; }
        public Nullable<System.DateTime> CreationDateTime { get; set; }
        public int Updated_By { get; set; }
        public Nullable<System.DateTime> UpdateDateTime { get; set; }

        public ICollection<Options> Options { get; set; }
    }
}

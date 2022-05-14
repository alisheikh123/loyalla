using System;
using System.ComponentModel.DataAnnotations;

namespace LoyallaApi.DBModels
{
    public class CaseQuestionAnswer
    {
        [Key]
        public int CaseQuestionAnswer_Id { get; set; }
        public int Case_Id { get; set; }
        public int Answer_Id { get; set; }
        public string Description { get; set; }
        public int Created_By { get; set; }
        public Nullable<System.DateTime> CreationDateTime { get; set; }
        public int Updated_By { get; set; }
        public Nullable<System.DateTime> UpdateDateTime { get; set; }


    }
}

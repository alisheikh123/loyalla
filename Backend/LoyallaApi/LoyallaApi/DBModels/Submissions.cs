using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace LoyallaApi.DBModels
{
    public class Submissions
    {
        public Submissions()
        {
            Submission = new HashSet<SubmissionDetails>();
        }
        [Key]
        public int SubmissionId { get; set; }
        public int PaperId { get; set; }
        public int StudentId { get; set; }
        public Nullable<System.DateTime> CreationDateTime { get; set; }

        public ICollection<SubmissionDetails> Submission { get; set; }
    }
}

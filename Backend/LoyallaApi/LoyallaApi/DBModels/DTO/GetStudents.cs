using System;

namespace LoyallaApi.DBModels.DTO
{
    public class GetStudents
    {
        public string Case { get; set; }
        public string Name { get; set; }
        public string Feedback { get; set; }
        public Nullable<DateTime> CreationDate { get; set; }
        public int SubmissionId { get; set; }
        public int Grade { get; set; }
        public int TotalQuestion { get; set; }
    }
}

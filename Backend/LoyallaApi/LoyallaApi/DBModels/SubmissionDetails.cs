using System.ComponentModel.DataAnnotations;

namespace LoyallaApi.DBModels
{
    public class SubmissionDetails
    {
        [Key]
        public int Id { get; set; }
        public int QuestionId { get; set; }
        public int SubmissionsSubmissionId { get; set; }
        public int AttemptedOptionId { get; set; }
        public int CorrectOptionId { get; set; }
        public string Description { get; set; }
    }
}

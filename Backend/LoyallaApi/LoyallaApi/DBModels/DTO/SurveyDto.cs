namespace LoyallaApi.DBModels.DTO
{
    public class SurveyDto
    {
        public bool IsTechnicalIssue { get; set; }
        public string TechincalIssueDescription { get; set; }
        public int Rate { get; set; }

        public bool IsUseFullLearningTool { get; set; }
        public string Comment { get; set; }
        public int StudentId { get; set; }
    }
}

using System.ComponentModel.DataAnnotations;

namespace LoyallaApi.DBModels
{
    public class Anwser
    {
        [Key]
        public int Id { get; set; }

        public int QuestionId { get; set; }

        public Questions Questions { get; set; }
        public double IsAnwsers { get; set; }
    }
}

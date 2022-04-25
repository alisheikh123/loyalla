using System.ComponentModel.DataAnnotations;

namespace LoyallaApi.DBModels
{
    public class Anwser
    {
        [Key]
        public int Id { get; set; }

        public double QuestionId { get; set; }

        public double Anwsers { get; set; }
    }
}

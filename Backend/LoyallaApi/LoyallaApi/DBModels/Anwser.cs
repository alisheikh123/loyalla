using System.ComponentModel.DataAnnotations;

namespace LoyallaApi.DBModels
{
    public class Anwser
    {
        [Key]
        public int Id { get; set; }

        public double OptionId { get; set; }
        public Options Options { get; set; }
        public double IsAnwsers { get; set; }
    }
}

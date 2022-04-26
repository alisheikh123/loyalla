using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace LoyallaApi.DBModels
{
    public class Options
    {
        [Key]
        public int Id { get; set; }

        public int QuestionId { get; set; }

        public Questions Questions { get; set; }

        public string OptionName { get; set; }


        public ICollection<Anwser> Anwsers { get; set; }    
    }
}

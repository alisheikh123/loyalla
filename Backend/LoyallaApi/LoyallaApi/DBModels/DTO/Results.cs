using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LoyallaApi.DBModels.DTO
{
    public class Results
    { 
        public int TotalQuestions { get; set; }
        public int AttemptedOptionId { get; set; }
        public int CorrectOptionId { get; set; }
        public DateTime? Date { get; set; }

    }
}

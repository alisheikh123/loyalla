using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace LoyallaApi.DBModels
{
    public class Paper
    {
        public Paper()
        {
            Questions = new HashSet<Questions>();
        }
        [Key]
        public int Id { get; set; }
        public string PaperName { get; set; }
        public string Title { get; set; }
        public string Description{ get; set; }
        public int CaseId { get; set; }
        public ICollection<Questions> Questions { get; set; }
        public int correctOptionId { get; set; }
    }
}

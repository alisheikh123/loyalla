﻿using System.ComponentModel.DataAnnotations;

namespace LoyallaApi.DBModels
{
    public class Paper
    {
        [Key]
        public int Id { get; set; }
        public string PaperName { get; set; }
        public string Title { get; set; }

        public string Description{ get; set; }
    }
}

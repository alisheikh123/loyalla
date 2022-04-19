using Microsoft.AspNetCore.Http;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LoyallaApi.DBModels
{
    public class Cases
    {
        [Key]
        public int Case_Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }

        public string FileName{ get; set; }

        [NotMapped]
        public IFormFile file { set; get; }
        public int? Created_By { get; set; } 
        public Nullable<System.DateTime> CreationDateTime { get; set; }
        public int? Updated_By { get; set; }
        public Nullable<System.DateTime> UpdateDateTime { get; set; }
    }
}

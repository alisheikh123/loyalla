using Microsoft.AspNetCore.Http;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace LoyallaApi.DBModels.DTO
{
    public class caseDto {
        public string title { get; set; }
        public string description { get; set; }

        public string fileName { get; set; }
        public IFormFile file { set; get; }
        public int? created_By { get; set; }
        public Nullable<System.DateTime> creationDateTime { get; set; }
        public int? updated_By { get; set; }
        public Nullable<System.DateTime> updateDateTime { get; set; }

    }
}

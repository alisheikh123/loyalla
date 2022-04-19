using Microsoft.AspNetCore.Http;
using System;

namespace LoyallaApi.DBModels.DTO
{
    public class caseDto { 
    public IFormFile file { set; get; }
    public int Case_Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public int? Created_By { get; set; }
    public Nullable<System.DateTime> CreationDateTime { get; set; }
    public int? Updated_By { get; set; }
    public Nullable<System.DateTime> UpdateDateTime { get; set; }
    
    }
}

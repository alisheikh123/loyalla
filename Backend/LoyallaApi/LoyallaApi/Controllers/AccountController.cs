using LoyallaApi.Context;
using LoyallaApi.DBModels;
using LoyallaApi.DBModels.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace LoyallaApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        public readonly LoyallaContext _context;

        public AccountController(LoyallaContext context)
        {
            _context = context;
        }

        [HttpPost, Route("signup")]
        public async Task signup(signupDto model)
        {
            Signup entityModel = new Signup();
            entityModel.Email = model.Email;
            entityModel.Age = model.Age;
            entityModel.CurrentStatus = model.CurrentStatus;
            entityModel.School = model.School;
            entityModel.Field = model.Field;
            entityModel.Location = model.Location;
            entityModel.MedicalTraining = model.MedicalTraining;
            entityModel.otherStatus = model.otherStatus;
            entityModel.otherTraining = model.otherTraining;
            entityModel.otherField = model.otherField;
            entityModel.Password = model.Password;
            entityModel.Username = model.Username;
            _context.Signup.Add(entityModel);
            await _context.SaveChangesAsync();
            
        }

        [HttpPost,Route("login")]
        public async Task<object> Login(loginDto login) 
        {
            var isUser = _context.Signup.Where(x => (x.Email == login.email | x.Username==login.email) && x.Password == login.password).Select(x=>new {x.Id,x.Email,x.Username }).FirstOrDefault();
            if (isUser == null) 
            {
                return "";
            }
            return isUser;
        }
    }
}

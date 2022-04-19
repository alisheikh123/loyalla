using LoyallaApi.DBModels;
using Microsoft.EntityFrameworkCore;

namespace LoyallaApi.Context
{
    public class LoyallaContext :DbContext
    {
        public LoyallaContext(DbContextOptions options) : base(options)
        { }
        public DbSet<Cases> Case_tbl { get; set; }
        public DbSet<Answers> Answer_tbl { get; set; }
        public DbSet<CaseQuestionAnswer> CaseQuestionAnswers_tbl { get; set; }
        public DbSet<Feedback> Feedback_tbl { get; set; }
        public DbSet<Questions> Question_tbl { get;set; }
        public DbSet<StudentCaseAttemptStatus> StudentCaseAttemptStatus_tbl { get; set; }
        public DbSet<Student> Student_tbl { get; set; }
        public DbSet<Signup> Signup { get; set; }
    }
}

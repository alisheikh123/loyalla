using LoyallaApi.DBModels;
using Microsoft.EntityFrameworkCore;

namespace LoyallaApi.Context
{
    public class LoyallaContext :DbContext
    {
        public LoyallaContext(DbContextOptions options) : base(options)
        { }
        public DbSet<Cases> Case_tbl { get; set; }
        public DbSet<Feedback> Feedback_tbl { get; set; }
        public DbSet<Questions> Question_tbl { get;set; }
        public DbSet<StudentCaseAttemptStatus> StudentCaseAttemptStatus_tbl { get; set; }
        public DbSet<Signup> Signup { get; set; }
        public DbSet<Options> Options_tbl{ get; set; }

        public DbSet<Anwser> Anwser_tbl { get; set; }
        public DbSet<Paper> Paper_tbl{ get; set; }
        public DbSet<Submissions> Submission_tbl{ get; set; }
        public DbSet<SubmissionDetails> SubmissionDetails_tbl { get; set; }
    }
}

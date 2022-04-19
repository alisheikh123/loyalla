﻿// <auto-generated />
using System;
using LoyallaApi.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace LoyallaApi.Migrations
{
    [DbContext(typeof(LoyallaContext))]
    partial class LoyallaContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .UseIdentityByDefaultColumns()
                .HasAnnotation("Relational:MaxIdentifierLength", 63)
                .HasAnnotation("ProductVersion", "5.0.0");

            modelBuilder.Entity("LoyallaApi.DBModels.Answers", b =>
                {
                    b.Property<int>("Answer_Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .UseIdentityByDefaultColumn();

                    b.Property<string>("Answer")
                        .HasColumnType("text");

                    b.Property<int>("Created_By")
                        .HasColumnType("integer");

                    b.Property<DateTime?>("CreationDateTime")
                        .HasColumnType("timestamp without time zone");

                    b.Property<int>("Question_Id")
                        .HasColumnType("integer");

                    b.Property<int?>("QuestionsQuestion_Id")
                        .HasColumnType("integer");

                    b.Property<DateTime?>("UpdateDateTime")
                        .HasColumnType("timestamp without time zone");

                    b.Property<int>("Updated_By")
                        .HasColumnType("integer");

                    b.HasKey("Answer_Id");

                    b.HasIndex("QuestionsQuestion_Id");

                    b.ToTable("Answer_tbl");
                });

            modelBuilder.Entity("LoyallaApi.DBModels.CaseQuestionAnswer", b =>
                {
                    b.Property<int>("CaseQuestionAnswer_Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .UseIdentityByDefaultColumn();

                    b.Property<int>("Answer_Id")
                        .HasColumnType("integer");

                    b.Property<int>("Case_Id")
                        .HasColumnType("integer");

                    b.Property<int>("Created_By")
                        .HasColumnType("integer");

                    b.Property<DateTime?>("CreationDateTime")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<DateTime?>("UpdateDateTime")
                        .HasColumnType("timestamp without time zone");

                    b.Property<int>("Updated_By")
                        .HasColumnType("integer");

                    b.HasKey("CaseQuestionAnswer_Id");

                    b.ToTable("CaseQuestionAnswers_tbl");
                });

            modelBuilder.Entity("LoyallaApi.DBModels.Cases", b =>
                {
                    b.Property<int>("Case_Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .UseIdentityByDefaultColumn();

                    b.Property<int?>("Created_By")
                        .HasColumnType("integer");

                    b.Property<DateTime?>("CreationDateTime")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<string>("FileName")
                        .HasColumnType("text");

                    b.Property<string>("Title")
                        .HasColumnType("text");

                    b.Property<DateTime?>("UpdateDateTime")
                        .HasColumnType("timestamp without time zone");

                    b.Property<int?>("Updated_By")
                        .HasColumnType("integer");

                    b.HasKey("Case_Id");

                    b.ToTable("Case_tbl");
                });

            modelBuilder.Entity("LoyallaApi.DBModels.Feedback", b =>
                {
                    b.Property<int>("Feedback_Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .UseIdentityByDefaultColumn();

                    b.Property<int>("Case_Id")
                        .HasColumnType("integer");

                    b.Property<int>("Created_By")
                        .HasColumnType("integer");

                    b.Property<DateTime?>("CreationDateTime")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("Feedbacks")
                        .HasColumnType("text");

                    b.Property<int>("Student_Id")
                        .HasColumnType("integer");

                    b.Property<DateTime?>("UpdateDateTime")
                        .HasColumnType("timestamp without time zone");

                    b.Property<int>("Updated_By")
                        .HasColumnType("integer");

                    b.HasKey("Feedback_Id");

                    b.ToTable("Feedback_tbl");
                });

            modelBuilder.Entity("LoyallaApi.DBModels.Questions", b =>
                {
                    b.Property<int>("Question_Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .UseIdentityByDefaultColumn();

                    b.Property<int>("Created_By")
                        .HasColumnType("integer");

                    b.Property<DateTime?>("CreationDateTime")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("Question")
                        .HasColumnType("text");

                    b.Property<DateTime?>("UpdateDateTime")
                        .HasColumnType("timestamp without time zone");

                    b.Property<int>("Updated_By")
                        .HasColumnType("integer");

                    b.HasKey("Question_Id");

                    b.ToTable("Question_tbl");
                });

            modelBuilder.Entity("LoyallaApi.DBModels.Signup", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .UseIdentityByDefaultColumn();

                    b.Property<string>("Age")
                        .HasColumnType("text");

                    b.Property<string>("CurrentStatus")
                        .HasColumnType("text");

                    b.Property<string>("Email")
                        .HasColumnType("text");

                    b.Property<string>("Field")
                        .HasColumnType("text");

                    b.Property<string>("Location")
                        .HasColumnType("text");

                    b.Property<string>("MedicalTraining")
                        .HasColumnType("text");

                    b.Property<string>("Password")
                        .HasColumnType("text");

                    b.Property<string>("School")
                        .HasColumnType("text");

                    b.Property<string>("Username")
                        .HasColumnType("text");

                    b.Property<string>("otherField")
                        .HasColumnType("text");

                    b.Property<string>("otherStatus")
                        .HasColumnType("text");

                    b.Property<string>("otherTraining")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Signup");
                });

            modelBuilder.Entity("LoyallaApi.DBModels.Student", b =>
                {
                    b.Property<int>("Student_Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .UseIdentityByDefaultColumn();

                    b.Property<string>("Address")
                        .HasColumnType("text");

                    b.Property<int>("Age")
                        .HasColumnType("integer");

                    b.Property<int>("Created_By")
                        .HasColumnType("integer");

                    b.Property<DateTime?>("CreationDateTime")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("Current_Status")
                        .HasColumnType("text");

                    b.Property<string>("Current_Year_Of_Medical_School")
                        .HasColumnType("text");

                    b.Property<string>("Current_Year_Of_Medical_Traning")
                        .HasColumnType("text");

                    b.Property<string>("Email")
                        .HasColumnType("text");

                    b.Property<string>("Field")
                        .HasColumnType("text");

                    b.Property<string>("Password")
                        .HasColumnType("text");

                    b.Property<string>("Student_Name")
                        .HasColumnType("text");

                    b.Property<DateTime?>("UpdateDateTime")
                        .HasColumnType("timestamp without time zone");

                    b.Property<int>("Updated_By")
                        .HasColumnType("integer");

                    b.HasKey("Student_Id");

                    b.ToTable("Student_tbl");
                });

            modelBuilder.Entity("LoyallaApi.DBModels.StudentCaseAttemptStatus", b =>
                {
                    b.Property<int>("StudentCaseAttemptStatus_Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .UseIdentityByDefaultColumn();

                    b.Property<int>("Case_Id")
                        .HasColumnType("integer");

                    b.Property<int>("Created_By")
                        .HasColumnType("integer");

                    b.Property<DateTime?>("CreationDateTime")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("Status")
                        .HasColumnType("text");

                    b.Property<int>("Student_Id")
                        .HasColumnType("integer");

                    b.Property<DateTime?>("UpdateDateTime")
                        .HasColumnType("timestamp without time zone");

                    b.Property<int>("Updated_By")
                        .HasColumnType("integer");

                    b.HasKey("StudentCaseAttemptStatus_Id");

                    b.ToTable("StudentCaseAttemptStatus_tbl");
                });

            modelBuilder.Entity("LoyallaApi.DBModels.Answers", b =>
                {
                    b.HasOne("LoyallaApi.DBModels.Questions", "Questions")
                        .WithMany("Answer")
                        .HasForeignKey("QuestionsQuestion_Id");

                    b.Navigation("Questions");
                });

            modelBuilder.Entity("LoyallaApi.DBModels.Questions", b =>
                {
                    b.Navigation("Answer");
                });
#pragma warning restore 612, 618
        }
    }
}

using AutoMapper;
using LoyallaApi.DBModels.DTO;

namespace LoyallaApi.DBModels.Mapper
{
    public class LoyallaMapper: Profile
    {
        public LoyallaMapper()
        {
            CreateMap<caseDto, Cases>();
            CreateMap<FeedbackDto, Feedback>();
        }
    }
}

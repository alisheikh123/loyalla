

namespace LoyallaApi.DBModels.DTO
{
    public class EntityResponseModel<T>
    {
        public int Code { get; set; }

        public string Msg { get; set; }

        public T Data { get; set; }

        public static EntityResponseModel<T> GetResult(int code, string msg, T data = default(T))
        {
            return new EntityResponseModel<T>
            {
                Code = code,
                Msg = msg,
                Data = data
            };
        }
    }
}

using multi_trade_vision_api.Services;

namespace Market.GetPrices
{
    public class PriceData
    {
        public string Symbol { get; set; }
        public decimal Price { get; set; }
        public decimal Change { get; set; }
        public double ChangePercent { get; set; }
        public DateTime Timestamp { get; set; }
    }
    
    public class Response
    {
        public List<PriceData> Prices { get; set; } = new();
    }
    
    public class Endpoint : EndpointWithoutRequest<Response>
    {
        private readonly PriceUpdateService _priceService;
        
        public Endpoint(PriceUpdateService priceService)
        {
            _priceService = priceService;
        }
        
        public override void Configure()
        {
            Get("market/prices");
            AllowAnonymous();
        }
        
        public override async Task HandleAsync(CancellationToken ct)
        {
            var allPrices = _priceService.GetAllPrices();
            var prices = allPrices.Select(kvp => new PriceData
            {
                Symbol = kvp.Key,
                Price = kvp.Value,
                Change = 0, // Will be calculated by frontend
                ChangePercent = 0, // Will be calculated by frontend
                Timestamp = DateTime.UtcNow
            }).ToList();
            
            await SendAsync(new Response { Prices = prices });
        }
    }
} 

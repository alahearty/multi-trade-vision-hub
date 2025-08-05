using Microsoft.AspNetCore.SignalR;
using System.Collections.Concurrent;

namespace multi_trade_vision_api.Services
{
    public class PriceUpdateHub : Hub
    {
        public override async Task OnConnectedAsync()
        {
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            await base.OnDisconnectedAsync(exception);
        }
    }

    public class PriceUpdateService : BackgroundService
    {
        private readonly IHubContext<PriceUpdateHub> _hubContext;
        private readonly ILogger<PriceUpdateService> _logger;
        private readonly ConcurrentDictionary<string, decimal> _currentPrices;
        private readonly Random _random;

        public PriceUpdateService(
            IHubContext<PriceUpdateHub> hubContext,
            ILogger<PriceUpdateService> logger)
        {
            _hubContext = hubContext;
            _logger = logger;
            _currentPrices = new ConcurrentDictionary<string, decimal>();
            _random = new Random();

            // Initialize with some default prices
            _currentPrices.TryAdd("BTC", 45000.00m);
            _currentPrices.TryAdd("ETH", 3200.00m);
            _currentPrices.TryAdd("AAPL", 150.00m);
            _currentPrices.TryAdd("GOOGL", 2800.00m);
            _currentPrices.TryAdd("TSLA", 250.00m);
            _currentPrices.TryAdd("MSFT", 350.00m);
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                try
                {
                    await UpdatePrices();
                    await Task.Delay(5000, stoppingToken); // Update every 5 seconds
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error updating prices");
                    await Task.Delay(10000, stoppingToken); // Wait longer on error
                }
            }
        }

        private async Task UpdatePrices()
        {
            var updates = new List<object>();

            foreach (var symbol in _currentPrices.Keys.ToList())
            {
                var currentPrice = _currentPrices[symbol];
                var changePercent = (_random.NextDouble() - 0.5) * 0.02; // ±1% change
                var newPrice = currentPrice * (1 + (decimal)changePercent);
                
                _currentPrices[symbol] = newPrice;

                updates.Add(new
                {
                    Symbol = symbol,
                    Price = newPrice,
                    Change = newPrice - currentPrice,
                    ChangePercent = changePercent * 100,
                    Timestamp = DateTime.UtcNow
                });
            }

            await _hubContext.Clients.All.SendAsync("PriceUpdate", updates);
        }

        public decimal GetCurrentPrice(string symbol)
        {
            return _currentPrices.TryGetValue(symbol, out var price) ? price : 0;
        }

        public Dictionary<string, decimal> GetAllPrices()
        {
            return _currentPrices.ToDictionary(kvp => kvp.Key, kvp => kvp.Value);
        }
    }
} 
using Dom;
using Microsoft.EntityFrameworkCore;

namespace multi_trade_vision_api
{
    public class JobStorageProvider : IJobStorageProvider<JobRecord>
    {
        private readonly AppDbContext _db;
        public JobStorageProvider(AppDbContext db)
        {
            _db = db;
        }
        public async Task<IEnumerable<JobRecord>> GetNextBatchAsync(PendingJobSearchParams<JobRecord> p)
        {
            return await _db.JobRecords
                .Where(p.Match)
                .OrderBy(r => r.Id)
                .Take(p.Limit)
                .ToListAsync(p.CancellationToken);
        }
        public async Task MarkJobAsCompleteAsync(JobRecord r, CancellationToken ct)
        {
            r.IsComplete = true;
            _db.JobRecords.Update(r);
            await _db.SaveChangesAsync(ct);
        }
        public async Task CancelJobAsync(Guid trackingId, CancellationToken ct)
        {
            var job = await _db.JobRecords.FirstOrDefaultAsync(r => r.TrackingID == trackingId, ct);
            if (job != null)
            {
                job.IsComplete = true;
                _db.JobRecords.Update(job);
                await _db.SaveChangesAsync(ct);
            }
        }
        public async Task OnHandlerExecutionFailureAsync(JobRecord r, Exception exception, CancellationToken ct)
        {
            if (r.FailureCount > 100)
            {
                r.IsComplete = true;
                r.IsCancelled = true;
                r.CancelledOn = DateTime.UtcNow;
                r.FailureReason = exception.Message;
                _db.JobRecords.Update(r);
                await _db.SaveChangesAsync(ct);
                return;
            }
            r.FailureCount++;
            r.FailureReason = exception.Message;
            r.ExecuteAfter = DateTime.UtcNow.AddMinutes(1);
            r.ExpireOn = r.ExecuteAfter.AddHours(4);
            _db.JobRecords.Update(r);
            await _db.SaveChangesAsync(ct);
        }
        public async Task PurgeStaleJobsAsync(StaleJobSearchParams<JobRecord> p)
        {
            var jobs = _db.JobRecords.Where(p.Match);
            _db.JobRecords.RemoveRange(jobs);
            await _db.SaveChangesAsync(p.CancellationToken);
        }
        public async Task StoreJobAsync(JobRecord r, CancellationToken ct)
        {
            _db.JobRecords.Add(r);
            await _db.SaveChangesAsync(ct);
        }
    }
}
-- Composite indexes support wallet history queries ordered by time.
CREATE INDEX "p2pTransfer_fromUserId_timestamp_idx" ON "p2pTransfer"("fromUserId", "timestamp");
CREATE INDEX "p2pTransfer_toUserId_timestamp_idx" ON "p2pTransfer"("toUserId", "timestamp");
CREATE INDEX "OnRampTransaction_userId_startTime_idx" ON "OnRampTransaction"("userId", "startTime");

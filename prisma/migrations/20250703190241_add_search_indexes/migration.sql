-- CreateIndex
CREATE INDEX "events_datetime_idx" ON "events"("datetime");

-- CreateIndex
CREATE INDEX "events_price_per_person_idx" ON "events"("price_per_person");

-- CreateIndex
CREATE INDEX "events_created_at_idx" ON "events"("created_at");

-- CreateIndex
CREATE INDEX "events_location_idx" ON "events"("location");

-- CreateIndex
CREATE INDEX "events_title_idx" ON "events"("title");

-- CreateIndex
CREATE INDEX "events_datetime_price_per_person_idx" ON "events"("datetime", "price_per_person");

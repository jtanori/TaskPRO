-- Initial canonical schema for TaskPRO
-- Created during Expedition E4: Domain, Types & Contracts
-- Evidence: TASKPRO-DB-001, TASKPRO-DOM-001, TASKPRO-DATA-001

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create bounded-context schemas
CREATE SCHEMA IF NOT EXISTS identity;
CREATE SCHEMA IF NOT EXISTS marketplace;
CREATE SCHEMA IF NOT EXISTS booking;
CREATE SCHEMA IF NOT EXISTS execution;
CREATE SCHEMA IF NOT EXISTS communication;
CREATE SCHEMA IF NOT EXISTS payments;
CREATE SCHEMA IF NOT EXISTS reviews;
CREATE SCHEMA IF NOT EXISTS media;
CREATE SCHEMA IF NOT EXISTS documents;
CREATE SCHEMA IF NOT EXISTS notifications;
CREATE SCHEMA IF NOT EXISTS system;

--
-- IDENTITY
--

CREATE TABLE identity.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  role TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ,
  version INTEGER NOT NULL DEFAULT 1
);

CREATE TABLE identity.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES identity.users(id),
  first_name TEXT,
  last_name TEXT,
  display_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  locale TEXT NOT NULL DEFAULT 'en',
  timezone TEXT NOT NULL DEFAULT 'UTC',
  currency TEXT NOT NULL DEFAULT 'USD',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ,
  version INTEGER NOT NULL DEFAULT 1
);

CREATE TABLE identity.addresses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES identity.users(id),
  label TEXT NOT NULL DEFAULT 'Other',
  street TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  postal_code TEXT NOT NULL,
  country TEXT NOT NULL,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  is_default BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ,
  version INTEGER NOT NULL DEFAULT 1
);

CREATE TABLE identity.devices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES identity.users(id),
  platform TEXT NOT NULL,
  push_token TEXT,
  last_seen TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

--
-- MARKETPLACE
--

CREATE TABLE marketplace.service_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id UUID REFERENCES marketplace.service_categories(id),
  name TEXT NOT NULL,
  icon TEXT,
  color TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE marketplace.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID NOT NULL REFERENCES marketplace.service_categories(id),
  name TEXT NOT NULL,
  description TEXT,
  estimated_duration_minutes INTEGER NOT NULL DEFAULT 0,
  base_price_minor INTEGER NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'USD',
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ,
  version INTEGER NOT NULL DEFAULT 1
);

CREATE TABLE marketplace.professionals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES identity.users(id),
  bio TEXT,
  years_experience INTEGER NOT NULL DEFAULT 0,
  rating DECIMAL(2, 1) NOT NULL DEFAULT 0,
  review_count INTEGER NOT NULL DEFAULT 0,
  travel_radius_meters INTEGER NOT NULL DEFAULT 0,
  verification_status TEXT NOT NULL DEFAULT 'pending',
  status TEXT NOT NULL DEFAULT 'pending_verification',
  is_available BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ,
  version INTEGER NOT NULL DEFAULT 1
);

CREATE TABLE marketplace.professional_skills (
  professional_id UUID NOT NULL REFERENCES marketplace.professionals(id),
  service_id UUID NOT NULL REFERENCES marketplace.services(id),
  level TEXT NOT NULL DEFAULT 'intermediate',
  PRIMARY KEY (professional_id, service_id)
);

CREATE TABLE marketplace.availability (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  professional_id UUID NOT NULL REFERENCES marketplace.professionals(id),
  weekday INTEGER NOT NULL CHECK (weekday BETWEEN 0 AND 6),
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

--
-- BOOKING
--

CREATE TABLE booking.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_number TEXT UNIQUE,
  customer_id UUID NOT NULL REFERENCES identity.users(id),
  professional_id UUID REFERENCES marketplace.professionals(id),
  service_id UUID NOT NULL REFERENCES marketplace.services(id),
  status TEXT NOT NULL DEFAULT 'draft',
  scheduled_start TIMESTAMPTZ NOT NULL,
  scheduled_end TIMESTAMPTZ,
  address_id UUID REFERENCES identity.addresses(id),
  notes TEXT,
  subtotal_minor INTEGER NOT NULL DEFAULT 0,
  tax_minor INTEGER NOT NULL DEFAULT 0,
  total_minor INTEGER NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'USD',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ,
  version INTEGER NOT NULL DEFAULT 1
);

CREATE TABLE booking.booking_status_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES booking.bookings(id),
  status TEXT NOT NULL,
  changed_by UUID REFERENCES identity.users(id),
  reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE booking.booking_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES booking.bookings(id),
  event_type TEXT NOT NULL,
  payload JSONB NOT NULL DEFAULT '{}',
  actor_id UUID REFERENCES identity.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE booking.assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES booking.bookings(id),
  professional_id UUID NOT NULL REFERENCES marketplace.professionals(id),
  accepted_at TIMESTAMPTZ,
  declined_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

--
-- EXECUTION
--

CREATE TABLE execution.tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES booking.bookings(id),
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  assigned_to UUID REFERENCES identity.users(id),
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE execution.evidence (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES booking.bookings(id),
  type TEXT NOT NULL,
  media_id UUID,
  notes TEXT,
  gps TEXT,
  created_by UUID NOT NULL REFERENCES identity.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE execution.work_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES booking.bookings(id),
  professional_id UUID NOT NULL REFERENCES marketplace.professionals(id),
  started_at TIMESTAMPTZ NOT NULL,
  ended_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

--
-- COMMUNICATION
--

CREATE TABLE communication.conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES booking.bookings(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE communication.participants (
  conversation_id UUID NOT NULL REFERENCES communication.conversations(id),
  user_id UUID NOT NULL REFERENCES identity.users(id),
  joined_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (conversation_id, user_id)
);

CREATE TABLE communication.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES communication.conversations(id),
  sender_id UUID NOT NULL REFERENCES identity.users(id),
  type TEXT NOT NULL DEFAULT 'text',
  body TEXT NOT NULL,
  attachment_id UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

--
-- PAYMENTS
--

CREATE TABLE payments.payment_methods (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES identity.users(id),
  provider TEXT NOT NULL,
  provider_reference TEXT NOT NULL,
  last4 TEXT,
  brand TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE payments.payment_intents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES booking.bookings(id),
  provider_reference TEXT,
  amount_minor INTEGER NOT NULL,
  currency TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE payments.transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  payment_intent_id UUID NOT NULL REFERENCES payments.payment_intents(id),
  status TEXT NOT NULL,
  provider_response JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE payments.payouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  professional_id UUID NOT NULL REFERENCES marketplace.professionals(id),
  amount_minor INTEGER NOT NULL,
  currency TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

--
-- REVIEWS
--

CREATE TABLE reviews.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES booking.bookings(id),
  customer_id UUID NOT NULL REFERENCES identity.users(id),
  professional_id UUID NOT NULL REFERENCES marketplace.professionals(id),
  overall DECIMAL(2, 1) NOT NULL,
  quality DECIMAL(2, 1),
  professionalism DECIMAL(2, 1),
  communication DECIMAL(2, 1),
  punctuality DECIMAL(2, 1),
  comment TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

--
-- MEDIA
--

CREATE TABLE media.media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_type TEXT NOT NULL,
  owner_id UUID NOT NULL,
  storage_path TEXT NOT NULL,
  mime_type TEXT,
  width INTEGER,
  height INTEGER,
  size_bytes INTEGER,
  checksum TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_by UUID REFERENCES identity.users(id)
);

--
-- DOCUMENTS
--

CREATE TABLE documents.documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  professional_id UUID NOT NULL REFERENCES marketplace.professionals(id),
  type TEXT NOT NULL,
  media_id UUID REFERENCES media.media(id),
  verification_status TEXT NOT NULL DEFAULT 'pending',
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

--
-- NOTIFICATIONS
--

CREATE TABLE notifications.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES identity.users(id),
  channel TEXT NOT NULL,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE notifications.preferences (
  user_id UUID PRIMARY KEY REFERENCES identity.users(id),
  push_enabled BOOLEAN NOT NULL DEFAULT true,
  email_enabled BOOLEAN NOT NULL DEFAULT true,
  sms_enabled BOOLEAN NOT NULL DEFAULT true,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

--
-- SYSTEM
--

CREATE TABLE system.event_store (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  aggregate TEXT NOT NULL,
  aggregate_id UUID NOT NULL,
  event_type TEXT NOT NULL,
  version INTEGER NOT NULL,
  payload JSONB NOT NULL DEFAULT '{}',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE system.jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL,
  payload JSONB NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'pending',
  scheduled_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  processed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE system.audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id UUID REFERENCES identity.users(id),
  entity TEXT NOT NULL,
  entity_id UUID NOT NULL,
  action TEXT NOT NULL,
  old_value JSONB,
  new_value JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

--
-- INDEXES
--

CREATE INDEX idx_bookings_customer ON booking.bookings(customer_id);
CREATE INDEX idx_bookings_professional ON booking.bookings(professional_id);
CREATE INDEX idx_bookings_status ON booking.bookings(status);
CREATE INDEX idx_bookings_scheduled_start ON booking.bookings(scheduled_start);
CREATE INDEX idx_booking_events_booking ON booking.booking_events(booking_id);
CREATE INDEX idx_tasks_booking ON execution.tasks(booking_id);
CREATE INDEX idx_messages_conversation ON communication.messages(conversation_id);
CREATE INDEX idx_media_owner ON media.media(owner_type, owner_id);
CREATE INDEX idx_event_store_aggregate ON system.event_store(aggregate, aggregate_id);

--
-- ROW LEVEL SECURITY
--

ALTER TABLE identity.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE identity.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE identity.addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE identity.devices ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketplace.professionals ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketplace.professional_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketplace.availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE booking.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE booking.booking_status_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE booking.booking_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE booking.assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE execution.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE execution.evidence ENABLE ROW LEVEL SECURITY;
ALTER TABLE execution.work_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE communication.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE communication.participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE communication.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments.payment_methods ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments.payment_intents ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments.payouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE media.media ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications.preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY users_self ON identity.users
  FOR ALL USING (id = auth.uid());

CREATE POLICY profiles_self ON identity.profiles
  FOR ALL USING (user_id = auth.uid());

CREATE POLICY addresses_self ON identity.addresses
  FOR ALL USING (user_id = auth.uid());

CREATE POLICY devices_self ON identity.devices
  FOR ALL USING (user_id = auth.uid());

CREATE POLICY professionals_read_all ON marketplace.professionals
  FOR SELECT USING (true);

CREATE POLICY professionals_self_write ON marketplace.professionals
  FOR ALL USING (user_id = auth.uid());

CREATE POLICY bookings_customer ON booking.bookings
  FOR ALL USING (customer_id = auth.uid());

CREATE POLICY bookings_professional ON booking.bookings
  FOR ALL USING (professional_id IN (
    SELECT id FROM marketplace.professionals WHERE user_id = auth.uid()
  ));

CREATE POLICY booking_events_participant ON booking.booking_events
  FOR SELECT USING (booking_id IN (
    SELECT id FROM booking.bookings
    WHERE customer_id = auth.uid() OR professional_id IN (
      SELECT id FROM marketplace.professionals WHERE user_id = auth.uid()
    )
  ));

CREATE POLICY conversations_participant ON communication.conversations
  FOR ALL USING (id IN (
    SELECT conversation_id FROM communication.participants WHERE user_id = auth.uid()
  ));

CREATE POLICY messages_participant ON communication.messages
  FOR ALL USING (conversation_id IN (
    SELECT conversation_id FROM communication.participants WHERE user_id = auth.uid()
  ));

CREATE POLICY payment_methods_self ON payments.payment_methods
  FOR ALL USING (user_id = auth.uid());

CREATE POLICY reviews_read_all ON reviews.reviews
  FOR SELECT USING (true);

CREATE POLICY reviews_self_write ON reviews.reviews
  FOR ALL USING (customer_id = auth.uid());

CREATE POLICY notifications_self ON notifications.notifications
  FOR ALL USING (user_id = auth.uid());

CREATE POLICY preferences_self ON notifications.preferences
  FOR ALL USING (user_id = auth.uid());

--
-- REALTIME
--
-- Supabase projects create the supabase_realtime publication automatically.
-- The statements below ensure the publication exists and includes the tables
-- that drive real-time updates without assuming a fresh project.

CREATE PUBLICATION IF NOT EXISTS supabase_realtime;

ALTER PUBLICATION supabase_realtime ADD TABLE booking.bookings;
ALTER PUBLICATION supabase_realtime ADD TABLE communication.messages;
ALTER PUBLICATION supabase_realtime ADD TABLE notifications.notifications;
ALTER PUBLICATION supabase_realtime ADD TABLE system.event_store;

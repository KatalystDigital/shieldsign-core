INSERT INTO "User" ("email", "name") VALUES (
  'serviceaccount@example.com',
  'Service Account'
) ON CONFLICT DO NOTHING;

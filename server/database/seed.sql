INSERT INTO teams (name)
VALUES
    ('Backend'),
    ('Frontend'),
    ('Platform'),
    ('SRE'),
    ('Database')
ON CONFLICT (name) DO NOTHING;

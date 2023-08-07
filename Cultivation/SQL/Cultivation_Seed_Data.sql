USE [Cultivation];
GO

INSERT INTO [RelationshipStatus] ([Status])
VALUES ('Single'), ('In a Relationship'), ('Married');

INSERT INTO [User] ([Name], [Email], [Password], [Bio], [RelationshipId])
VALUES
  ('John Doe', 'john.doe@example.com', 'hashed_password_1', 'I love gardening!', 1),
  ('Jane Smith', 'jane.smith@example.com', 'hashed_password_2', 'Gardening is my passion!', 1),
  ('Alex Johnson', 'alex.johnson@example.com', 'hashed_password_3', 'Exploring the wonders of gardening.', 2);

INSERT INTO [Cult] ([Name], [Created], [Description], [LeaderId])
VALUES
  ('Rose Enthusiasts', '2023-07-15', 'A community of rose lovers.', 1),
  ('Herb Gardeners', '2023-06-30', 'Growing and using fresh herbs.', 2),
  ('Bonsai Masters', '2023-08-01', 'The art of bonsai cultivation.', 3);

INSERT INTO [Post] ([Description], [Date], [CultId], [UserId])
VALUES
  ('Just planted some beautiful roses today!', '2023-07-16 10:30:00', 1, 1),
  ('Harvested fresh herbs for cooking!', '2023-07-05 14:45:00', 2, 2),
  ('Pruned my bonsai tree for the first time!', '2023-08-01 09:15:00', 3, 3);

INSERT INTO [CultMember] ([UserId], [CultId])
VALUES
  (1, 1),
  (2, 2),
  (3, 2),
  (1, 3),
  (3, 3);

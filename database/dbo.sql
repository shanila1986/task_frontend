/*
 Navicat Premium Data Transfer

 Source Server         : local
 Source Server Type    : SQL Server
 Source Server Version : 17001050
 Source Catalog        : taskManagementDb
 Source Schema         : dbo

 Target Server Type    : SQL Server
 Target Server Version : 17001050
 File Encoding         : 65001

 Date: 24/02/2026 10:39:00
*/


-- ----------------------------
-- Table structure for __EFMigrationsHistory
-- ----------------------------
IF EXISTS (SELECT * FROM sys.all_objects WHERE object_id = OBJECT_ID(N'[dbo].[__EFMigrationsHistory]') AND type IN ('U'))
	DROP TABLE [dbo].[__EFMigrationsHistory]
GO

CREATE TABLE [dbo].[__EFMigrationsHistory] (
  [MigrationId] nvarchar(150) COLLATE SQL_Latin1_General_CP1_CI_AS  NOT NULL,
  [ProductVersion] nvarchar(32) COLLATE SQL_Latin1_General_CP1_CI_AS  NOT NULL
)
GO

ALTER TABLE [dbo].[__EFMigrationsHistory] SET (LOCK_ESCALATION = TABLE)
GO


-- ----------------------------
-- Records of __EFMigrationsHistory
-- ----------------------------
INSERT INTO [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20260221073145_InitialCreate', N'9.0.10')
GO


-- ----------------------------
-- Table structure for Tasks
-- ----------------------------
IF EXISTS (SELECT * FROM sys.all_objects WHERE object_id = OBJECT_ID(N'[dbo].[Tasks]') AND type IN ('U'))
	DROP TABLE [dbo].[Tasks]
GO

CREATE TABLE [dbo].[Tasks] (
  [Id] int  IDENTITY(1,1) NOT NULL,
  [Title] nvarchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS  NOT NULL,
  [Description] nvarchar(500) COLLATE SQL_Latin1_General_CP1_CI_AS  NULL,
  [IsCompleted] bit  NOT NULL,
  [CreatedAt] datetime2(7)  NOT NULL,
  [UpdatedAt] datetime2(7)  NULL
)
GO

ALTER TABLE [dbo].[Tasks] SET (LOCK_ESCALATION = TABLE)
GO


-- ----------------------------
-- Records of Tasks
-- ----------------------------
SET IDENTITY_INSERT [dbo].[Tasks] ON
GO

INSERT INTO [dbo].[Tasks] ([Id], [Title], [Description], [IsCompleted], [CreatedAt], [UpdatedAt]) VALUES (N'4', N'Title 1', N'Description 1', N'0', N'2026-02-23 03:17:48.5393404', N'2026-02-24 05:01:36.2688531')
GO

INSERT INTO [dbo].[Tasks] ([Id], [Title], [Description], [IsCompleted], [CreatedAt], [UpdatedAt]) VALUES (N'5', N'Title 2', N'Description 2', N'1', N'2026-02-23 12:54:21.3149421', N'2026-02-24 05:01:52.5025366')
GO

SET IDENTITY_INSERT [dbo].[Tasks] OFF
GO


-- ----------------------------
-- Primary Key structure for table __EFMigrationsHistory
-- ----------------------------
ALTER TABLE [dbo].[__EFMigrationsHistory] ADD CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY CLUSTERED ([MigrationId])
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)  
ON [PRIMARY]
GO


-- ----------------------------
-- Auto increment value for Tasks
-- ----------------------------
DBCC CHECKIDENT ('[dbo].[Tasks]', RESEED, 5)
GO


-- ----------------------------
-- Primary Key structure for table Tasks
-- ----------------------------
ALTER TABLE [dbo].[Tasks] ADD CONSTRAINT [PK_Tasks] PRIMARY KEY CLUSTERED ([Id])
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)  
ON [PRIMARY]
GO


-- Database Schema for Aura Spatial
-- Version 1.0
-- DBMS: PostgreSQL

-- Users Table: Stores information about all user types.
CREATE TABLE Users (
    UserID SERIAL PRIMARY KEY,
    Username VARCHAR(255) UNIQUE NOT NULL,
    PasswordHash VARCHAR(255) NOT NULL, -- Always store hashed passwords.
    Email VARCHAR(255) UNIQUE NOT NULL,
    UserType VARCHAR(50) NOT NULL, -- e.g., 'Owner', 'Designer', 'Vendor'
    CreatedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ProjectCases Table: Manages renovation project details.
CREATE TABLE ProjectCases (
    CaseID SERIAL PRIMARY KEY,
    OwnerID INT NOT NULL,
    DesignerID INT, -- Can be NULL initially
    CaseStatus VARCHAR(50) NOT NULL DEFAULT 'Open', -- e.g., 'Open', 'In Progress', 'Completed'
    ProjectDescription TEXT,
    RoomDimensions JSONB, -- Store room dimensions as a JSON object.
    CreatedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (OwnerID) REFERENCES Users(UserID),
    FOREIGN KEY (DesignerID) REFERENCES Users(UserID)
);

-- MarketplaceInventory Table: Stores details of furniture and items.
CREATE TABLE MarketplaceInventory (
    ItemID SERIAL PRIMARY KEY,
    VendorID INT NOT NULL,
    ItemName VARCHAR(255) NOT NULL,
    ItemDescription TEXT,
    Price DECIMAL(10, 2) NOT NULL,
    StockQuantity INT NOT NULL DEFAULT 0,
    SKU VARCHAR(100) UNIQUE NOT NULL,
    Dimensions JSONB,
    CreatedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (VendorID) REFERENCES Users(UserID)
);

-- Transactions Table: Tracks all sales and commissions.
CREATE TABLE Transactions (
    TransactionID SERIAL PRIMARY KEY,
    CaseID INT NOT NULL,
    ItemID INT NOT NULL,
    DesignerID INT NOT NULL,
    Quantity INT NOT NULL,
    TotalAmount DECIMAL(10, 2) NOT NULL,
    CommissionAmount DECIMAL(10, 2) NOT NULL,
    TransactionDate TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (CaseID) REFERENCES ProjectCases(CaseID),
    FOREIGN KEY (ItemID) REFERENCES MarketplaceInventory(ItemID),
    FOREIGN KEY (DesignerID) REFERENCES Users(UserID)
);

-- Comments and triggers for table updates can be added later.

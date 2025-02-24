-- Create Users Table
CREATE TABLE IF NOT EXISTS `users` (
    `user_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(50) NOT NULL UNIQUE,
    `password_hashed` VARCHAR(255) NOT NULL,
    `role` VARCHAR(50) NOT NULL,
    `added_date` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_date` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create Transformers Table
CREATE TABLE IF NOT EXISTS `Transformers` (
    `transformer_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `transformer_name` VARCHAR(50) UNIQUE,
    `last_inspection_date` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `added_date` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_date` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create Transformer Inspections Table
CREATE TABLE IF NOT EXISTS `TransformerInspections` (
    `inspection_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `transformer_name` VARCHAR(50) NOT NULL,
    `username` VARCHAR(50) NOT NULL,
    `transformer_temp` DECIMAL(5,2) NOT NULL,
    `left_green_line_temp` DECIMAL(5,2) NOT NULL,
    `left_yellow_line_temp` DECIMAL(5,2) NOT NULL, 
    `left_red_line_temp` DECIMAL(5,2) NOT NULL,
    `left_blue_line_temp` DECIMAL(5,2) NOT NULL,
    `right_green_line_temp` DECIMAL(5,2) NOT NULL,
    `right_yellow_line_temp` DECIMAL(5,2) NOT NULL,
    `right_red_line_temp` DECIMAL(5,2) NOT NULL,
    `right_blue_line_temp` DECIMAL(5,2) NOT NULL,
    `line_temp_under_the_base` DECIMAL(5,2) NOT NULL,
    `comments` VARCHAR(255),
    `inspection_date` DATETIME NOT NULL,
    `weather` VARCHAR(50) NOT NULL,
    `temperature` DECIMAL(5,2) NOT NULL,
    `added_date` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_date` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (transformer_name) REFERENCES Transformers(transformer_name),
    FOREIGN KEY (username) REFERENCES Users(username)
) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

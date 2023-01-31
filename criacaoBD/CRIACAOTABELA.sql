CREATE TABLE `userimgupload`.`usersdata` ( 
`id` INT NOT NULL AUTO_INCREMENT,
`username` VARCHAR(45) NULL,
`userimg` VARCHAR(45) NULL,
`date` DATETIME NULL,
PRIMARY KEY (`id`));

use userimgupload;
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
flush privileges;
-- grant all privileges on *.* to root@localhost identified by 'password' with grant option;
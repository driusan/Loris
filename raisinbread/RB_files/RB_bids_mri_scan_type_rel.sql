SET FOREIGN_KEY_CHECKS=0;
TRUNCATE TABLE `bids_mri_scan_type_rel`;
LOCK TABLES `bids_mri_scan_type_rel` WRITE;
INSERT INTO `bids_mri_scan_type_rel` (`MRIScanTypeID`, `BIDSCategoryID`, `BIDSScanTypeSubCategoryID`, `BIDSScanTypeID`, `BIDSEchoNumber`) VALUES (40,2,1,1,NULL);
INSERT INTO `bids_mri_scan_type_rel` (`MRIScanTypeID`, `BIDSCategoryID`, `BIDSScanTypeSubCategoryID`, `BIDSScanTypeID`, `BIDSEchoNumber`) VALUES (41,1,NULL,2,NULL);
INSERT INTO `bids_mri_scan_type_rel` (`MRIScanTypeID`, `BIDSCategoryID`, `BIDSScanTypeSubCategoryID`, `BIDSScanTypeID`, `BIDSEchoNumber`) VALUES (44,1,NULL,3,NULL);
INSERT INTO `bids_mri_scan_type_rel` (`MRIScanTypeID`, `BIDSCategoryID`, `BIDSScanTypeSubCategoryID`, `BIDSScanTypeID`, `BIDSEchoNumber`) VALUES (45,1,NULL,4,NULL);
INSERT INTO `bids_mri_scan_type_rel` (`MRIScanTypeID`, `BIDSCategoryID`, `BIDSScanTypeSubCategoryID`, `BIDSScanTypeID`, `BIDSEchoNumber`) VALUES (48,3,NULL,5,NULL);
UNLOCK TABLES;
SET FOREIGN_KEY_CHECKS=1;

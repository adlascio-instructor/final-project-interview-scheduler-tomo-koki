INSERT INTO appointment (id, time, day_id) VALUES
(1,'12pm', (SELECT id from day WHERE id=1)),
(2,'1pm', (SELECT id from day WHERE id=1)),
(3,'2pm', (SELECT id from day WHERE id=1)),
(4,'3pm', (SELECT id from day WHERE id=1)),
(5,'4pm', (SELECT id from day WHERE id=1)),

(6,'12pm', (SELECT id from day WHERE id=2)),
(7,'1pm', (SELECT id from day WHERE id=2)),
(8,'2pm', (SELECT id from day WHERE id=2)),
(9,'3pm', (SELECT id from day WHERE id=2)),
(10,'4pm', (SELECT id from day WHERE id=2)),

(11,'12pm', (SELECT id from day WHERE id=3)),
(12,'1pm', (SELECT id from day WHERE id=3)),
(13,'2pm', (SELECT id from day WHERE id=3)),
(14,'3pm', (SELECT id from day WHERE id=3)),
(15,'4pm', (SELECT id from day WHERE id=3)),

(16,'12pm', (SELECT id from day WHERE id=4)),
(17,'1pm', (SELECT id from day WHERE id=4)),
(18,'2pm', (SELECT id from day WHERE id=4)),
(19,'3pm', (SELECT id from day WHERE id=4)),
(20,'4pm', (SELECT id from day WHERE id=4)),

(21,'12pm', (SELECT id from day WHERE id=5)),
(22,'1pm', (SELECT id from day WHERE id=5)),
(23,'2pm', (SELECT id from day WHERE id=5)),
(24,'3pm', (SELECT id from day WHERE id=5)),
(25,'4pm', (SELECT id from day WHERE id=5));

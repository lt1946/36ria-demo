<?php

// Change this with your Google calendar feed
$calendarURL = 'http://www.google.com/calendar/feeds/riahome123%40126.com/public/basic';

// Nothing else to edit
$feed = file_get_contents($calendarURL);
header('Content-type: text/xml'); 
echo $feed;

?>
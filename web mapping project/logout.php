<?php

session_destroy();
session_unset();
header('Location: index.html');
exit;

?>
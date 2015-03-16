<?php
header('Access-Control-Allow-Origin: *');
$config = array(
    'id_type' => 'int',
    'user' => 'denverpost',
    'api_key' => trim(file_get_contents('.api_key'))
);
$config['dir'] = 'output/' . $config['user'] . '/';

// Validate input
if ( $config['id_type'] == 'int' ):
    $article_id = intval($_GET['article_id']);
    $section = preg_replace("/[^A-Za-z0-9-]/", '', $_GET['section']);
    if ( $section != '' ) $section .= '/';
    $slug = preg_replace("/[^A-Za-z0-9-]/", '', $_GET['slug']);

    if ( $article_id < 1000000 ):
        $article_id = 15208788;
        $section = '';
        $slug = 'sad-trombone';
    endif;
endif;

// Make sure we haven't already gotten the shortcode for this article
$exists = file_get_contents($config['dir'] . $article_id . '.js');
if ( $exists != '' ):
    die($exists);
endif;

// Put the article URL together. We don't use referer data here because referer data can't be trusted.
$url = 'http://www.' . $config['user'] . '.com/' . $section . 'ci_' . $article_id . '/' . $slug;

// Get the shortcode for this article
$shortcode =  file_get_contents('http://api.bit.ly/shorten?version=2.0.1&format=text&longUrl=' . $url . '&login=' . $config['user'] . '&apiKey=' . $config['api_key']);

file_put_contents($config['dir'] . $article_id . '.js', trim($shortcode));
echo $shortcode;

// Build the remote-directory directory string
$remote_dir = substr($article_id, 0, 1) . '/' . substr($article_id, 1, 1) . '/' . substr($article_id, 2, 1) . '/' . substr($article_id, 3, 1) . '/' . substr($article_id, 4, 1) . '/';

// FTP it to extras
require('/var/www/lib/class.ftp.php');
$error_display = FALSE;
$file_directory_local = '/var/www/vhosts/denverpostplus.com/httpdocs/app/shortcodes/' . $config['dir'];
$file_directory_remote = '/DenverPost/cache/shortcodes/denverpost/NGPS/_/' . $remote_dir;
$file_format = 'js';
$file_mode = FTP_ASCII;
$file_name = $article_id;
// First create the directories
$ftp = new ftp();
$ftp->mkdir($file_directory_remote);
$ftp->ftp_connection_close();

// Now put the file
$ftp = new ftp();
$ftp->file_put($file_name, $file_directory_local, $file_format, $error_display, $file_mode, $file_directory_remote);
$ftp->ftp_connection_close();

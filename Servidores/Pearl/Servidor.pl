#!/usr/local/bin/perl
#
# 
#

use LWP::Simple;

my $url = "http://localhost:3000/part/5";
          # ACME boomerang
my $browser = LWP::UserAgent->new;
# Issue request, with an HTTP header
my $response = $browser->get($url,
  'User-Agent' => 'Mozilla/4.0 (compatible; MSIE 7.0)',
);
die 'Error getting $url' unless $response->is_success;
print "Content type is: \n", $response->content_type;
print  "Content type is: \n";
print $response->content;



my $uri = 'http://localhost:3000/part/9';
my $json = '{"username":"foo","password":"bar"}';
my $req = HTTP::Request->new( 'POST', $uri );
$req->header( 'Content-Type' => 'application/json' );
$req->content( $response->content);

my $lwp = LWP::UserAgent->new;
$lwp->request( $req );
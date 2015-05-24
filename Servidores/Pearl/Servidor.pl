#!/usr/local/bin/perl
#
# 
#

use LWP::Simple;
use JSON ();
use JSON;

sub bbl_sort {
    my $array = shift;
    my $not_complete = 1;
    my $index;
    my $len = ((scalar @$array) - 2);
    while ($not_complete) {
        $not_complete = 0;
        foreach $index (0 .. $len) {
            if (@$array[$index] > @$array[$index + 1]) {
                my $temp = @$array[$index + 1];
                @$array[$index + 1] = @$array[$index];
                @$array[$index] = $temp;
                $not_complete = 1;
            }
        }
    }
}

my $url = "http://localhost:3000/part/5";
          # ACME boomerang
my $browser = LWP::UserAgent->new;
# Issue request, with an HTTP header
my $response = $browser->get($url,
  'User-Agent' => 'Mozilla/4.0 (compatible; MSIE 7.0)',
);
die 'Error getting $url' unless $response->is_success;
#print "Content type is: \n", $response->content_type;
#print  "Content is: \n";
#print $response->content;


@content = JSON->new->utf8->decode($response->content);

$someNames = join(', ', $response->content);

while ($someNames =~ "\"") {
	$someNames =~ s/"//;
}
$someNames =~ s/\[//;
$someNames =~ s/\]//;

my @arregloFinal = split(/,/, $someNames);
print @arregloFinal;
bbl_sort(\@arregloFinal);
print "\n";

$arraySize = @arregloFinal;
$arraySize = scalar (@arregloFinal);
$arraySize = $#arregloFinal + 1;

print "\n";
print "LARGO\n";
print $arraySize;
print "\n";
for (my $var = 0; $var < $arraySize; $var++) {
	print "\n";
	print $arregloFinal[$var];
	print "\n";
}

$someNames = join(', ', @arregloFinal);
print "\n";
print $someNames;
print "\n";


my $uri = 'http://localhost:3000/part/10';
my $json = '{"username":"'. $someNames .'"}';

print $json;
#my $json = { array => qq{{"array" : $someNames}} } ;
#my $json = '{"username":"foo","password":"bar"}';

my $req = HTTP::Request->new( 'POST', $uri );
$req->header( 'Content-Type' => 'application/json' );
$req->content($json);

my $lwp = LWP::UserAgent->new;
$lwp->request( $req );
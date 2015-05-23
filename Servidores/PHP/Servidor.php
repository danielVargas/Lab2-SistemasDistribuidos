<?php

#ref : http://stackoverflow.com/questions/9001294/bubble-sort-implementation-in-php
function bubble_sort($arr) {
    $size = count($arr);
    for ($i=0; $i<$size; $i++) {
        for ($j=0; $j<$size-1-$i; $j++) {
            if ($arr[$j+1] < $arr[$j]) {
                swap($arr, $j, $j+1);
            }
        }
    }
    return $arr;
}

function swap(&$arr, $a, $b) {
    $tmp = $arr[$a];
    $arr[$a] = $arr[$b];
    $arr[$b] = $tmp;
}
#ref: https://github.com/technopagan/Computer-Science-Algorithms/blob/master/sorting/merge-sort-algorithm.php
function mergesort($data) {
    // Only process if we're not down to one piece of data
    if(count($data)>1) {
        
        // Find out the middle of the current data set and split it there to obtain to halfs
        $data_middle = round(count($data)/2, 0, PHP_ROUND_HALF_DOWN);
        // and now for some recursive magic
        $data_part1 = mergesort(array_slice($data, 0, $data_middle));
        $data_part2 = mergesort(array_slice($data, $data_middle, count($data)));
        // Setup counters so we can remember which piece of data in each half we're looking at
        $counter1 = $counter2 = 0;
        // iterate over all pieces of the currently processed array, compare size & reassemble
        for ($i=0; $i<count($data); $i++) {
            // if we're done processing one half, take the rest from the 2nd half
            if($counter1 == count($data_part1)) {
                $data[$i] = $data_part2[$counter2];
                ++$counter2;
            // if we're done with the 2nd half as well or as long as pieces in the first half are still smaller than the 2nd half
            } elseif (($counter2 == count($data_part2)) or ($data_part1[$counter1] < $data_part2[$counter2])) { 
                $data[$i] = $data_part1[$counter1];
                ++$counter1;
            } else {
                $data[$i] = $data_part2[$counter2];
                ++$counter2;
            }
        }
    }
    return $data;
}


function quicksort( $array ) {
    if( count( $array ) < 2 ) {
        return $array;
    }
    $left = $right = array( );
    reset( $array );
    $pivot_key  = key( $array );
    $pivot  = array_shift( $array );
    foreach( $array as $k => $v ) {
        if( $v < $pivot )
            $left[$k] = $v;
        else
            $right[$k] = $v;
    }
    return array_merge(quicksort($left), array($pivot_key => $pivot), quicksort($right));
}

$json = file_get_contents('http://localhost:3000/part/3');
$obj = json_decode($json);

var_dump(json_decode($json, true));

$float_value_of_var = floatval($obj[0]);

var_dump($float_value_of_var);



$arreglo = array();
for ($i=0; $i < count($obj); $i++) { 
	array_push($arreglo, floatval($obj[$i]));

}
print_r($arreglo);

print_r("Bubble Sort\n");
$arreglo = bubble_sort($arreglo);

print_r($arreglo);

print_r("Merge Sort\n");
$arreglo = mergesort($arreglo);
print_r($arreglo);
//
print_r("Quick Sort\n");
$arreglo = quicksort($arreglo);
print_r($arreglo);



//API Url
$url2 = 'http://localhost:3000/part/9';
 

print_r(json_encode($arreglo));
//The JSON data.

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url2);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_HTTPHEADER, array("Content-Type: application/json","Authorization: OAuth 2.0 token here"));
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($arreglo));
$result = curl_exec($ch);

?>
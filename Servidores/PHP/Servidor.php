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
//
?>
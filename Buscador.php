<?php
$ciudad = $_POST['ciudad'];
$tipo = $_POST['tipo'];
$precio = $_POST['precio'];

$posicion = strpos($precio,';');
$precioInicio = substr($precio,0,$posicion);
$precioFin = substr($precio,$posicion+1);

$data_file = fopen("data-1.json","r");
$data_readed = fread($data_file,filesize("data-1.json"));
$data = json_decode($data_readed,true);

$arrayData = array();
foreach($data as $i){
  $precioData = $i['Precio'];
  $precioData = substr($precioData, strpos($precioData,'$')+1);
  $sep = strpos($precioData,',');
  $precioData = substr($precioData,0,$sep).substr($precioData,$sep+1);
  if($precioData>=$precioInicio && $precioData<=$precioFin){
    array_push($arrayData,$i);
  }
}

$resultado = array();
if(!empty($ciudad) && !empty($tipo)){
  foreach($arrayData as $i){
    if($i['Ciudad'] === $ciudad && $i['Tipo'] === $tipo){
      array_push($resultado , $i);
    }
  }
}elseif(!empty($ciudad)){
  foreach($arrayData as $i){
    if($i['Ciudad'] === $ciudad){
      array_push($resultado, $i);
    }
  }
}elseif(!empty($tipo)){
  foreach($arrayData as $i){
    if($i['Tipo'] === tipo){
      array_push($resultado, $i);
    }
  }
}else{
  $resultado = $arrayData;
}

echo json_encode($resultado);
//$resultadoJson = json_encode($resultado);
//echo '{"result":"success", "message":"Resultados obtenidos exitosamente", "data":'.$resultadoJson.'}';

fclose($data_file);
?>

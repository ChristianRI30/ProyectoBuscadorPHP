/*
  Creación de una función personalizada para jQuery que detecta cuando se detiene el scroll en la página
*/
$.fn.scrollEnd = function(callback, timeout) {
  $(this).scroll(function(){
    var $this = $(this);
    if ($this.data('scrollTimeout')) {
      clearTimeout($this.data('scrollTimeout'));
    }
    $this.data('scrollTimeout', setTimeout(callback,timeout));
  });
};
/*
  Función que reproduce el video de fondo al hacer scroll, y deteiene la reproducción al detener el scroll
*/
function playVideoOnScroll(){
  var ultimoScroll = 0,
      intervalRewind;
  var video = document.getElementById('vidFondo');
  $(window)
    .scroll((event)=>{
      var scrollActual = $(window).scrollTop();
      if (scrollActual > ultimoScroll){
       video.play();
     } else {
        //this.rewind(1.0, video, intervalRewind);
        video.play();
     }
     ultimoScroll = scrollActual;
    })
    .scrollEnd(()=>{
      video.pause();
    }, 10)
}
//playVideoOnScroll();

//Inicializar sliders materialize al cargar todo el documento
$(document).ready(function(){
    inicializarSlider();
    inicializarPagina();
});
function inicializarPagina(){
  $.ajax({
    url:'data-1.json',
    datatype:'text',
    type:'get',
    success: function(data){
      LlenarCombos(data);
    },
    error: function(error){
      alert("Error al cargar combos");
    }
  })
}
function inicializarSlider(){
  $("#rangoPrecio").ionRangeSlider({
    type: "double",
    grid: false,
    min: 0,
    max: 100000,
    from: 200,
    to: 80000,
    prefix: "$"
  });
}
function LlenarCombos(data){
  var ciudades = [];
  var tipos = [];

  for (let i = 0; i < data.length; i++) {
    if (ciudades.indexOf(data[i].Ciudad) === -1 ) {
      ciudades.push(data[i].Ciudad);
    }
    if (tipos.indexOf(data[i].Tipo) === -1 ) {
      tipos.push(data[i].Tipo);
    }
  }

  for (let j = 0; j < ciudades.length; j++) {
    $('#selectCiudad').append('<option value="'+ciudades[j]+'">'+ciudades[j]+'</option>');
  }
  for (let t = 0; t < tipos.length; t++) {
    $('#selectTipo').append('<option value="'+tipos[t]+'">'+tipos[t]+'</option>')
  }
  $('select').material_select();
}
$("#btnMostrarTodos").click(function(){
  $.ajax({
    url:'data-1.json',
    datatype:'text',
    type:'get',
    success: function(data){
      MostrarResultado(data);
    },
    error:function(error){
      alert(error);
    }
  })
})
$('#btnBuscar').click(function(){
  let precio = $('#rangoPrecio').val();
  let ciudad = $('#selectCiudad option:selected').val();
  let tipo = $('#selectTipo option:selected').val();

  let form_Data = new FormData();
  form_Data.append('ciudad',ciudad);
  form_Data.append('tipo',tipo);
  form_Data.append('precio',precio);

  $.ajax({
    url:'Buscador.php',
    datatype:'json',
    cache: false,
    contentType: false,
    processData: false,
    data:form_Data,
    type:'post',
    success:function(data){
      let resultBusqueda = JSON.parse(data);
      MostrarResultado(resultBusqueda);
    },
    error:function(error){
      alert(error);
    }
  })
})
function MostrarResultado(array){
  $('.resultadoBusqueda').empty();
  for(let i=0; i<array.length; i++){
      $('.resultadoBusqueda').append(`<div class="card horizontal">
          <div class="colImage card-image cl-wrapper">
              <img class="img-responsive cl-image" src="img/home.jpg">
          </div>
          <div class="colDetalle card-stacked">
            <div class="card-content">
              <p>
                  <b>Dirección: </b>${array[i].Direccion}<br>
                  <b>Ciudad: </b>${array[i].Ciudad}<br>
                  <b>Teléfono: </b>${array[i].Telefono}<br>
                  <b>Código Postal: </b>${array[i].Codigo_Postal}<br>
                  <b>Tipo: </b>${array[i].Tipo}<br>
                  <span class="cprecio"><b>Precio: </b>${array[i].Precio}</span>
              </p>
            </div>
            <div class="card-action">
                <a>Ver mas</a>
            </div>
        </div>
    </div>`);
  }
}

function createProduct(productName,productState, lastUpdate, idCA){

    $.ajax({
        url: 'pongan la url aqui por favor',
        type:'POST',
        dataType:'JSON',
        data:{
            "action": "createProduct",
            "nombreProducto": productName,
            "estadoProducto": productState,
            "ultimaFechaActualizacion": lastUpdate,
            "idCentroDeAcopio": idCA,
            
            },
            success: function(response){

                if (response.success !=0){
                    
                }
                else{
                   
                }
            },

            error:function(response){
                $("#errorMessage").fadeIn(1000);
                $("#errorMessage").html("Error con el servidor");
                $("#errorMessage").fadeOut(3000);
            }
        });
}
function listCA(){

    $.ajax({
        url: '../../services/CA_Service.php',
        type:'POST',
        dataType:'JSON',
        data:{
            "action": "listCA",
            },
            success: function(response){

                if (response.success !=0){
                    $("#caList").html(response.html);
                }
                else{
                    $("#caList").html("<li>No hay Centros de Acopio Listados</li>");
                }
            },

            error:function(response){
                $("#errorMessage").fadeIn(1000);
                $("#errorMessage").html("Error con el servidor");
                $("#errorMessage").fadeOut(3000);
                $("#caList").html("<li val='-1'>No hay Centros de Acopio</li>");
            }
        });
}

jQuery(window).load(function() {
	
    var d = new Date();
    var strDate = d.getFullYear() + "/" + (d.getMonth()+1) + "/" + d.getDate() +"  "+ d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    $("#lastUpdate").text(strDate);
	listCA();
});


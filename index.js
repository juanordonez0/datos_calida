let container = document.getElementById("wrapper");
let list = [];
let index = -1;

function add_newdata(){

    index++;

    container.innerHTML += ` <p>Clases Aparentes</p>
    <input type="text" id="lim_inf${index}"> <span>- </span><input type="text" id="lim_sup${index}"> 

    <p>Frecuencia</p>
    <input type="number" id="frec${index}"> `;

}





function tryw(){
    
  

    for (let i = 0; i <= index;  i++){
        list[i] = {
            lim_inf: parseInt(document.getElementById(`lim_inf${i}`).value),
            lim_sup: parseInt(document.getElementById(`lim_sup${i}`).value),
            frec: parseInt(document.getElementById(`frec${i}`).value)
        }
    }

 

    

    localStorage.setItem("list", JSON.stringify(list));

    location.href = "resultado.html";
}


function leerJSON() {
    const archivo = document.getElementById('archivoJSON').files[0];
    const lector = new FileReader();

    lector.onload = function(event) {
      const contenido = event.target.result;
      const datos = JSON.parse(contenido);
      localStorage.setItem("list", JSON.stringify(datos));
      console.log(datos);
    };

    lector.readAsText(archivo);


 

    location.href = "resultado.html";
  }



function exportarJSON() {
    for (let i = 0; i <= index;  i++){
        list[i] = {
            lim_inf: parseInt(document.getElementById(`lim_inf${i}`).value),
            lim_sup: parseInt(document.getElementById(`lim_sup${i}`).value),
            frec: parseInt(document.getElementById(`frec${i}`).value)
        }
    }
    const objetoJSON = list;
    const contenidoJSON = JSON.stringify(objetoJSON);
    const archivo = new Blob([contenidoJSON], { type: 'application/json' });

    const url = URL.createObjectURL(archivo);
    const enlace = document.createElement('a');
    enlace.href = url;
    enlace.download = 'datos.json';
    enlace.click();
  }








       
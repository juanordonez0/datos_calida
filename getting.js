
/*
DEDICO ESTE CODIGO A EL PEPE, A ETE SETCH A MAMI PRUNIA

MAIN DEBUGGER:
GERSON GIRÓN

*/


let list = JSON.parse(localStorage.getItem("list"));
let n = list.length;
let media = getMedia(list);


addFa(list);




let xifsum = 0;
let fsum = 0;
let sum1 = 0; 
let sum2 = 0;
let sum3 = 0;
let fa = 0




list.forEach(e => {



    //VARIABLES PARA EL LOOP
    let xi = (e.lim_inf + e.lim_sup)/2 
    let xif = xi * e.frec;
    let xidifmedi = xi-media;
    let abs = Math.abs(xidifmedi);
    fa += e.frec; 
  
    let fabs = e.frec * abs;


    let abssq = Math.pow(abs, 2);
    let fabssq = e.frec * abssq.toFixed(2);

    let xidifmedi4 = Math.pow(xidifmedi, 4)
    let fxidifmedi4 = e.frec * xidifmedi4.toFixed(2);


    

    //SUMATORIAS
    fsum += e.frec;
    xifsum += xif;
    sum1 += fabs;
    sum2 += fabssq;
    sum3 += fxidifmedi4;
    

    container.innerHTML += `   
    <tr>
        <td>${e.lim_inf} - ${e.lim_sup}</td>
        <td>${e.frec}</td>
        <td>${fa}</td>
        <td>${xi.toFixed(1)}</td>
        <td>${xif.toFixed(1)}</td>
        <td>${xidifmedi.toFixed(2)}</td>
        <td>${abs.toFixed(2)}</td>
        <td>${fabs.toFixed(2)}</td>
        <td>${abssq.toFixed(2)}</td>
        <td>${fabssq.toFixed(2)}</td>
        <td>${xidifmedi4.toFixed(2)}</td>
        <td>${fxidifmedi4.toFixed(2)}</td>
    </tr>`;
});


container.innerHTML += `
<tr>
    <td></td>
    <td>${fsum.toFixed(2)}</td>
    <td></td>
    <td>${xifsum.toFixed(2)}</td>
    <td></td>
    <td></td>
    <td></td>
    <td>${sum1.toFixed(2)}</td>
    <td></td>
    <td>${sum2.toFixed(2)}</td>
    <td></td>
    <td>${sum3.toFixed(2)}</td>

</tr>



`;



let mediana = getMediana(list, getIndex(list));

let d = Math.sqrt(getV(sum2, getN(list)));

let asimetria = getAsimetria(media, mediana, d);
console.log(asimetria);




print("media_output",`<b>${media.toFixed(2)}</b>`); 
print("DM_output",`<b>${getDM(sum1, getN(list)).toFixed(2)}</b>`); 
print("V_output",`<b>${getV(sum2, getN(list)).toFixed(2)}</b>`); 
print("DE_output",`<b>${Math.sqrt(getV(sum2, getN(list))).toFixed(2)}</b>`); 
print("asi", `<b>${asimetria.toFixed(2)}</b>`)
print("curt", `<b>${getCurtosis(sum3, d).toFixed(2)}</b>`)




function getN(arr){
let n = 0;

arr.forEach( e => {n += e.frec;});

return n;

}

function getMedia(arr){

    let fsum = 0;
    let n = getN(list);
    let xifsum_med = 0;
    arr.forEach( e => {

        let xi = (e.lim_inf + e.lim_sup)/2 
        let xif_med = xi * e.frec;
        xifsum_med += xif_med;

        fsum = xifsum_med;
 
    })

    let media = fsum / n;

    return media;
}


function  getV(sum2, n){


    let num = n-1
    let v = sum2 / num;

    return v;

}


function  getDM(sum1, n){

    let dm = sum1 / n;

    return dm;


}

function addFa(arr){

    let fa = 0
    for (let i = 0;i < arr.length; i++){
     
        fa += arr[i].frec;

        arr[i] = {
        ...arr[i], 
        fa
        }
    }

}

function getIndex(arr){

    let fA = arr.map(e  => {return e.fa});

 

    let n2 = getN(arr)/2;
    let selected_index = 0;

    for (let i = 0;i < fA.length; i++){
     
        if(fA[i] >= n2){
            selected_index = fA.indexOf(fA[i]);
            console.log(selected_index)
            return selected_index;
        }
    }
    
}

function getMediana(arr, index){

    let n2 = getN(arr)/2;
    let lri = arr[index].lim_inf-0.5;
    let i =  getInterval(arr);
    let f = arr[index].frec;
    let faa = arr[index-1].fa;

    let mediana = lri + (i/f)*(n2-faa);



    console.log(mediana);

    return mediana;

}


function getPart(arr, index, type, num){
    
}

let operacion = 0; 


 function getIndexOfPart(arr, type, num){
    let fA = arr.map(e  => {return e.fa});
    let n = getN(list);
    let parts = 0;
    let selected_index = 0;

    switch(type){
        case "Cuartil":
            parts = 4;
        break;
        case "Decil":
            parts = 10;
        break;
        case "Percentil":
            parts = 100;
        break;
    }

    operacion = (num * n) / (parts);
    


    for (let i = 0;i < fA.length; i++){
     
        if(fA[i] >= operacion){
            selected_index = fA.indexOf(fA[i]);
            console.log(selected_index)
            return selected_index;
        }
    }
    
 }





function getPart(arr, indexpart, operacion){

  

    let lri = arr[indexpart].lim_inf-0.5;
    let i =  getInterval(arr);
    let f = arr[indexpart].frec;
    let faa = arr[indexpart-1] ? arr[indexpart-1].fa : 0; 

    let part = lri + ((operacion - faa)/f) * i;

    console.log(`${lri} + ((${operacion} - ${faa})/${f}) * ${i}`)

    return part;
}



function calculatePart(){
    print("part_output", getPart(list, getIndexOfPart(list, document.getElementById("option").value , document.getElementById("num").value), operacion))

    console.log(operacion);

}




function getInterval(arr){
    let i = arr[1].lim_inf - arr[0].lim_inf;

    return i;
}

function getAsimetria(media, mediana, d){



    let asimetria = 3 * (media - mediana) / d;


    return asimetria;

}

function print(id, text){
    document.getElementById(id).innerHTML = text;

}


function getCurtosis(sum3, de){

    let sumatoria = sum3;
    let n = getN(list);
    let desv = de;

    let curt = (sumatoria) / (n * (Math.pow(desv, 4)));


    return curt;
}




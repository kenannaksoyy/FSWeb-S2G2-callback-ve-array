const { fifaData } = require('./fifa.js')

//Onceki Fonklar yokmuş gibi davrandım

function ulke_taglar(fifa_data){
    let ulke_taglar_dizi=[]
    for (let i=0 ; i<fifa_data.length; i++){
        if(!(ulke_taglar_dizi.includes(fifa_data[i]["Home Team Initials"]))){
                ulke_taglar_dizi.push(fifa_data[i]["Home Team Initials"]);
        }
        if(!(ulke_taglar_dizi.includes(fifa_data[i]["Away Team Initials"]))){
                ulke_taglar_dizi.push(fifa_data[i]["Away Team Initials"]);
        }
        
    }
    return ulke_taglar_dizi;
}
ulke_kısaltmalar=ulke_taglar(fifaData);

function UlkelerinKazanmaSayilari(ulke_kısaltmalar,fifa_data) {
    const finaller = fifa_data.filter(mac =>  mac["Stage"]=="Final");
	const kazananlar_kısaltma = finaller.map(maclar =>{
            if (maclar["Home Team Goals"]>maclar["Away Team Goals"]){
                return maclar["Home Team Initials"];
            }
            else if (maclar["Home Team Goals"]<maclar["Away Team Goals"]){
                return maclar["Away Team Initials"];
            }
            else{
                const parca_dizi= maclar["Win conditions"].split(" ");
                if(parca_dizi[0]===maclar["Home Team Goals"]){
                    return maclar["Home Team Initials"];
                }
                else{
                    return maclar["Away Team Initials"];
                }

            }
        
	});
    let kazananlar_kısaltma_2=[];
    let kupa_sayisi=[];
    for (let i = 0; i<kazananlar_kısaltma.length;i++){
        if (!(kazananlar_kısaltma_2.includes(kazananlar_kısaltma[i]))){
            let sayac=0
            for(let j = 0 ; j<kazananlar_kısaltma.length;j++){
                if(kazananlar_kısaltma[i]===kazananlar_kısaltma[j]){
                    sayac=sayac+1
                }
            }
            kupa_sayisi.push(sayac);
            kazananlar_kısaltma_2.push(kazananlar_kısaltma[i]);
        }
    }
    str_dizi=[]
    for(let i=0;i<kazananlar_kısaltma_2.length;i++){
        str_dizi.push(`${kazananlar_kısaltma_2[i]}  ${kupa_sayisi[i]} dünya kupasını kazandı!`)
    }
    return str_dizi
}
console.log(UlkelerinKazanmaSayilari(ulke_kısaltmalar,fifaData));

function EnCokGolAtan() {
	const finaller = fifa_data.filter(mac =>  mac["Stage"]=="Final");
    
    
}

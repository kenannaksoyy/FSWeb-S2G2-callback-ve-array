const { fifaData } = require('./fifa.js')
let finaller=fifaData.filter(mac => mac.Stage=="Final");

function yeni_data_olustur(gelen_finaller){
    let data_dizi=[]
    gelen_finaller.forEach(final => {
        let kazanan_tag="";
        if (final["Home Team Goals"]>final["Away Team Goals"]){
            kazanan_tag= final["Home Team Initials"];
        }
        else if (final["Home Team Goals"]<final["Away Team Goals"]){
            kazanan_tag= final["Away Team Initials"];
        }
        else{
            const parca_dizi= final["Win conditions"].split(" ");
            if(parca_dizi[0]===final["Home Team Goals"]){
                kazanan_tag= final["Home Team Initials"];
            }
            else{
                kazanan_tag= final["Away Team Initials"];
            }

        }
        let kaz_id;
        if(kazanan_tag===final["Home Team Initials"]){
            kaz_id=0;
        }
        else{
            kaz_id=1;
        }
        const obje={
            "yil":final["Year"],
            "ev":final["Home Team Name"],
            "ev_gol":final["Home Team Goals"],
            "ev_tag":final["Home Team Initials"],
            "konuk":final["Away Team Name"],
            "konuk_gol":final["Away Team Goals"],
            "konuk_tag":final["Away Team Initials"],
            "kazanan_tag":kazanan_tag,
            "kazanan_id":kaz_id
        };
        data_dizi.push(obje);
    });
    return data_dizi;
}

function final_ulke_taglar(gelen_finaller){
    let ulke_taglar_dizi=[]
    gelen_finaller.forEach(final =>{
        if(!(ulke_taglar_dizi.includes(final["ev_tag"]))){
            ulke_taglar_dizi.push(final["ev_tag"]);
    }
        if(!(ulke_taglar_dizi.includes(final["konuk_tag"]))){
            ulke_taglar_dizi.push(final["konuk_tag"]);
    }
    });
    
    return ulke_taglar_dizi;
}

let data = yeni_data_olustur(finaller);
let finalist_taglar=final_ulke_taglar(data);

console.log(data);
console.log(finalist_taglar);
console.log("data ve tag hazır");

function UlkelerinKazanmaSayilari(gelen_finalist_taglar,gelen_data) {
    let kazanan_dizi=[];
    gelen_finalist_taglar.forEach(finalist => {
        let sayac=0;
        let ulke="";
        gelen_data.forEach(data =>{
            if(finalist===data.kazanan_tag){
                sayac=sayac+1
                if(data.kazanan_id==0){
                    ulke=data.ev;
                }
                else{
                    ulke=data.konuk;
                }
            }
        });
        if(sayac>0){
            const obje={
                "ulke":ulke,
                "kupa_sayi":sayac
            };
            kazanan_dizi.push(`${obje.ulke} ${obje.kupa_sayi} dünya kupasını kazandı!`);
        }
    });
    return kazanan_dizi;   
}
console.log(UlkelerinKazanmaSayilari(finalist_taglar,data));

function max_bul(dizi){
    let max=0;
    let tut;
    for(let i=0;i<dizi.length;i++){
        if(dizi[i]["gol_sayisi"]>max){
            max=dizi[i]["gol_sayisi"];
            tut=i;
        }
    }
    return tut;
}

function EnCokGolAtan(gelen_finalist_taglar,gelen_data) {
    let dizi=[]
	gelen_finalist_taglar.forEach(finalist =>{
        let gol_sayac=0;
        let ulke="";
        gelen_data.forEach(data => {
            if(finalist===data.ev_tag){
                gol_sayac=gol_sayac + data.ev_gol;
                ulke=data.ev;
            }
            if(finalist===data.konuk_tag){
                gol_sayac=gol_sayac + data.konuk_gol;
                ulke=data.konuk;
            }

        });
        const obje={
            "ulke":ulke,
            "gol_sayisi":gol_sayac
        };
        dizi.push(obje);
    });
    tut=max_bul(dizi);
    return dizi[tut];

}
console.log(EnCokGolAtan(finalist_taglar,data));

function EnKotuDefans(gelen_finalist_taglar,gelen_data) {
    let dizi=[]
	gelen_finalist_taglar.forEach(finalist =>{
        let gol_sayac=0;
        let ulke="";
        gelen_data.forEach(data => {
            if(finalist===data.ev_tag){
                gol_sayac=gol_sayac + data.konuk_gol;
                ulke=data.ev;
            }
            if(finalist===data.konuk_tag){
                gol_sayac=gol_sayac + data.ev_gol;
                ulke=data.konuk;
            }

        });
        const obje={
            "ulke":ulke,
            "gol_sayisi":gol_sayac
        };
        dizi.push(obje);
    });
    tut = max_bul(dizi);
    return dizi[tut];	
}
console.log(EnKotuDefans(finalist_taglar,data));
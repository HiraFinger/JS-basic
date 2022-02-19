var mangNhap=[2,4,6,8,-10,-22];
var max=0
for(let i=0;i<mangNhap.length-1;i++){
    for(let j=i+1;j<mangNhap.length;j++){
        if(max<mangNhap[i]*mangNhap[j]){
            max=mangNhap[i]*mangNhap[j]
        }
    }
}
console.log(max)

var nguoi=[60,20,20,90]
    team1=[]
    team2=[]
for(let i=0;i<=nguoi.length-1;i++){
    if (i%2==0){
        team1.push(nguoi[i])
    }else{
        team2.push(nguoi[i])
    }
}
function tongCan(mang){
    var tong=0;
    mang.forEach(function(weight){
        tong+= weight;
    });
    return tong;
}
console.log([tongCan(team2),tongCan(team1)])




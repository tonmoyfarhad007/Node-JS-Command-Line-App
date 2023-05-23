#!/usr/bin/env node

const [, , rowcols,passengers] = process.argv;


function seatArrangement(rowcols,passengers) {

    // console.log(rowcols,passengers);
    let row=0,col=0;
    for(let r=0; r<rowcols.length; r++){
        
        if( Math.max(...rowcols[r])>row){
            row =  Math.max(...rowcols[r]);
        }
        col+=rowcols[r][0];
    }

    let finalSeatPlan = new Array(row).fill().map(() => new Array(col).fill(' '));

    let gcol=0;
    for(let i=0; i<rowcols.length; i++){
        let insideArr = rowcols[i];
        for(let r=0; r<insideArr[1]; r++){
            for(let c=0; c<insideArr[0]; c++){
                if(c===0 && r!=0){
                    gcol = gcol - insideArr[0]
                }
                
                let remainder = insideArr[0] % 2;
                let quotient;
                if(remainder===0){
                    quotient =  insideArr[0] / 2;
                }
                if(i===0 && c===0){
                    finalSeatPlan[r][gcol]='w';
                } else if(i===rowcols.length-1 && c===insideArr[0]-1){
                    finalSeatPlan[r][gcol]='w';
                }else if(remainder > 0 && c > 0 && c <= remainder){
                    finalSeatPlan[r][gcol]='m';
                }else if(remainder === 0 && c > 0 && c <= quotient && quotient>1){
                    finalSeatPlan[r][gcol]='m';
                }else{
                    finalSeatPlan[r][gcol]='a';
                }
                gcol++;   
            }
        }
    }


    // console.table(finalSeatPlan);
    let a=0, m=0, w=0;
    for(let r=0; r<finalSeatPlan.length; r++){
        for(let c=0; c<finalSeatPlan[r].length; c++){
            if(finalSeatPlan[r][c]==='a'){
                if(a>=passengers){
                    break
                }
                finalSeatPlan[r][c]=++a;
                w=a;
            }
        }
    }
    if(a<passengers){
        for(let r=0; r<finalSeatPlan.length; r++){
            for(let c=0; c<finalSeatPlan[r].length; c++){
                if(finalSeatPlan[r][c]==='w'){
                    if(w>=passengers){
                        break;
                    } 
                    finalSeatPlan[r][c]=++w;
                    m=w;                   
                }
            }
        }
    }
    if(w<passengers){
        for(let r=0; r<finalSeatPlan.length; r++){
            for(let c=0; c<finalSeatPlan[r].length; c++){
                if(finalSeatPlan[r][c]==='m'){
                    if(m>=passengers){
                        break
                    }
                    finalSeatPlan[r][c]=++m;
                }
            }
        }
    }
    return finalSeatPlan;
}


// Print the greeting to the console
console.table(seatArrangement(JSON.parse(rowcols),passengers));

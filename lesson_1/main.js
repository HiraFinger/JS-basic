// Array.prototype.reduce2= function(callback, result){
//     let i=0;
//     if(arguments.length<2){
//         result=this[0];
//         i=1;
//     }
//     for(;i<this.length;i++){
//         result= callback(result, this[i],i,this);
//     }
//     return result;
// }

// function highlight([first, ...strings], ...values){
//     return values.reduce(
//         (acc, current)=> [...acc, `<span>${current}</span>`,strings.shift()],
//          [first]
//     ).join('');
// }

// var brand='F8',
//     course='Javascript';

// const html= highlight`Học lập trình ${course} tại ${brand}!`;
// console.log(html);

import logger, {TYPE_ERROR, TYPE_LOG, TYPE_WARN} from './logger.js'

logger('text mes', TYPE_WARN);

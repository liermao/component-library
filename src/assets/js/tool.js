// 根据数组中的某一项进行排序，传入数组，以及需要排序的项
export function sortByKey(array,key,amount){
  if(amount == "down"){
    return array.sort(function(a,b){
      var x = a[key];
      var y = b[key];
      return x-y;
    })
  }else if(amount == "up"){
    return array.sort(function(a,b){
      var x = a[key];
      var y = b[key];
      return y-x;
    })
  }
}

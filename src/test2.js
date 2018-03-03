var array = ['a', 'b', 'a', 'c', 'b', 'a', 'd', 'b'];




var locations = [];

var place = array.indexOf('b');
while (place != -1) {
  locations.push(place);
  place = array.indexOf('b', place + 1);
}
console.log(locations);
let l2=locations;
console.log(l2);

// [1 4 7]
console.log('----');
console.log(array);
let array2=array;
let array3 = array.map(a=>a);
console.log(array2);
console.log(array3);
console.log('----');
array.sort();
console.log(array);
console.log(array2);

console.log(array3);

console.log('----');

array.pop();
console.log(array);
console.log(array2);

console.log(array3);

console.log('----');
let x=5;
let y=x;
console.log(x);
console.log(y);
x=7;
console.log(x+' '+ y);
console.log(y);

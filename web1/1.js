var a="access"
var b=""
var s=new Set([""])
for(var i=0;i<a.length;i++){
if(s.has(a[i])){
    b+='*'
}
else{
    b+=a[i]
    s.add(a[i]);
}

}
console.log(b);
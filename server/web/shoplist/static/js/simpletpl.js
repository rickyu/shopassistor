// Simple JavaScript Templating
// John Resig - http://ejohn.org/ - MIT Licensed
(function(){
  var cache = {};
  
//   this.tmpl = function tmpl(str, data){
//     // Figure out if we're getting a template, or if we need to
//     // load the template - and be sure to cache the result.
//     var fn = !/\W/.test(str) ?
//       cache[str] = cache[str] ||
//         tmpl(document.getElementById(str).innerHTML) :
//       
//       // Generate a reusable function that will serve as a template
//       // generator (and which will be cached).
//       new Function("obj",
//         "var p=[],print=function(){p.push.apply(p,arguments);};" +
//         
//         // Introduce the data as local variables using with(){}
//         "with(obj){p.push('" +
//         
//         // Convert the template into pure JavaScript
//         str
//           .replace(/[\r\t\n]/g, " ")
//           .split("<%").join("\t")
//           .replace(/((^|%>)[^\t]*)'/g, "$1\r")
//           .replace(/\t=(.*?)%>/g, "',$1,'")
//           .split("\t").join("');")
//           .split("%>").join("p.push('")
//           .split("\r").join("\\'")
//       + "');}return p.join('');");
//     
//     // Provide some basic currying to the user
//     return data ? fn( data ) : fn;
//   };
   this.tmpl = function tmpl(str, data){
     // Figure out if we're getting a template, or if we need to
     // load the template - and be sure to cache the result.
    var fn = null;
    if (!/\W/.test(str)) {
        cache[str] = cache[str];
        if (!cache[str]) {
            cache[str] = tmpl(document.getElementById(str).innerHTML);
        }
        fn = cache[str];
    } else {
        scripts = "var p=[],print=function(){p.push.apply(p,arguments);};"  +
         "with(obj){p.push('" + 
        str
           .replace(/[\r\t\n]/g, " ")
           .split("<%").join("\t")
           .replace(/((^|%>)[^\t]*)'/g, "$1\r")
           .replace(/\t=(.*?)%>/g, "',$1,'")
           .split("\t").join("');")
           .split("%>").join("p.push('")
           .split("\r").join("\\'")
       + "');}return p.join('');";
        fn = new Function("obj", scripts);

    }
    if (data) {
        return fn(data);
    } else {
        return fn;
    }
   };

})();

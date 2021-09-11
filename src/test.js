let a = { headers: {'content': '111111'} }
let b = { ...a, headers: {'content': '00000', 'auth': 'xsdads'} }
let c = { headers: {'content': '00000', 'auth': 'xsdads'}, ...a }

console.log(b, 'b')
console.log(c, 'c')

console.log('master的更新');
console.log('master的更新222');
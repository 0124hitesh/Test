var items = ['a', 'b', 'c', 'd', 'e', 'f']
var valuesToRemove = 'c'
var items = items.filter(item => !valuesToRemove.includes(item))

console.log(items)
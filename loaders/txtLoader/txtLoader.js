
module.exports = loader
function loader(source){
  let res = ''
  let options = this.query
  let str = ''
  if(options.author){
    let addStr = `author: ${options.author}`
    str = `${addStr}\n${source}`
  }else{
    str = `${source}`
  }
  res = `module.exports = ${JSON.stringify(str)}`
  return res
}
import exp = require("constants");

export type Indexed<T = unknown> = {
    [key in string]: T;
  };
  function isEqual(x: Indexed, y: Indexed): boolean {
      const ok = Object.keys, tx = typeof x, ty = typeof y;
    if(x && y && tx === 'object' && tx === ty){
      return ok(x).length === ok(y).length &&
        ok(x).every(
        (key: string): boolean => {
        return isEqual(x[key] as Indexed, y[key] as Indexed)
      })
    } else{
     return  x === y
    }
  }
  export type StringIndexed = Record<string, any>;

 
  
  export function queryStringify(data: StringIndexed): string | never {
    
    function getParamsWithPath(prefix:string, obj: any): string[] {
      let parts_: string[] = []
       const keys_ = Object.keys(obj)
      
      for(let i =0; i< keys_.length; i++){
         const key_ = keys_[i]
        const value_ = obj[key_]
        if(typeof value_ === 'object' &&
            !Array.isArray(value_) &&
            value_ !== null){
          
              parts_.push(...getParamsWithPath(`${prefix}[${key_}]`, value_))
              continue
            }
          parts_.push(`${prefix}[${key_}]=${value_}`)
        }
       return parts_
    }
    
    const keys = Object.keys(data)
    let parts: string[] =[]
    for(let i =0; i< keys.length; i++){
      const key = keys[i]
      if(typeof data[key] === 'object' &&
      !Array.isArray(data[key]) &&
      data[key] !== null){
        parts.push(...getParamsWithPath(key, data[key]))
        continue
      }
      
      if(Array.isArray(data[key])){
        data[key].map((el:string, index:number) =>{
          parts.push(`${key}[${index}]=${el}`)
        })
        continue
      } 
      parts.push(`${key}=${data[key]}`)
    }
    return parts.join('&')
  }
  
 export function merge(lhs: Indexed, rhs: Indexed): Indexed {
    for (var p in rhs) {
      try {
   
        if ( typeof rhs[p] == "object"  ) {
          lhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
  
        } else {
          lhs[p] = rhs[p];
  
        }
  
      } catch(e) {
        // Property in destination object not set; create it and set its value.
        lhs[p] = rhs[p];
  
      }
    }
   
    return lhs
  }
  
  
  
  export function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
      if(typeof path != "string"){
        throw new Error("path must be string")
      }
    if(typeof object != "object"){
      object = value
      return
    }
    const names = path.split('.')
   
    let last = value
    
     for(let i = names.length -1; i>=0; i--){
         const name: string = names[i]
         let item:Indexed = {}
         item[name] = last
        last = item
     }
      object =  merge(object  as Indexed, last as Indexed )
      console.log(object)
      return object
    
  }


export type Indexed<T = any> = {
  [key in string]: T;
};
export type StringIndexed = Record<string, any>;



export function queryStringify(data: StringIndexed): string | never {

  function getParamsWithPath(prefix: string, obj: any): string[] {
    let parts_: string[] = []
    const keys_ = Object.keys(obj)

    for (let i = 0; i < keys_.length; i++) {
      const key_ = keys_[i]
      const value_ = obj[key_]
      if (typeof value_ === 'object' &&
        !Array.isArray(value_) &&
        value_ !== null) {

        parts_.push(...getParamsWithPath(`${prefix}[${key_}]`, value_))
        continue
      }
      parts_.push(`${prefix}[${key_}]=${value_}`)
    }
    return parts_
  }

  const keys = Object.keys(data)
  let parts: string[] = []
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    if (typeof data[key] === 'object' &&
      !Array.isArray(data[key]) &&
      data[key] !== null) {
      parts.push(...getParamsWithPath(key, data[key]))
      continue
    }

    if (Array.isArray(data[key])) {
      data[key].map((el: string, index: number) => {
        parts.push(`${key}[${index}]=${el}`)
      })
      continue
    }
    parts.push(`${key}=${data[key]}`)
  }
  return parts.join('&')
}

export function merge(lhs: Indexed, rhs: Indexed): Indexed {
  for (let p in rhs) {
    if (!rhs.hasOwnProperty(p)) {
      continue;
    }

    try {
      if (rhs[p].constructor === Object) {
        rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
      } else {
        lhs[p] = rhs[p];
      }
    } catch (e) {
      lhs[p] = rhs[p];
    }
  }

  return lhs;
}



export function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
  if (typeof path != "string") {
    throw new Error("path must be string")
  }
  if (typeof object != "object") {
    object = value
    return
  }
  const names = path.split('.')

  let last = value

  for (let i = names.length - 1; i >= 0; i--) {
    const name: string = names[i]
    let item: Indexed = {}
    item[name] = last
    last = item
  }
  object = merge(object as Indexed, last as Indexed)

  return object

}


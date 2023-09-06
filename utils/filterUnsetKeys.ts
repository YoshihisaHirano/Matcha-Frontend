interface GenericObj { [key: string]: any }

export function filterUnsetKeys(obj: GenericObj) {
    const filteredObj: GenericObj = {}
    for (const key of Object.keys(obj)) {
        if (obj[key]) {
            filteredObj[key] = obj[key]
        }
    }
    return filteredObj
}
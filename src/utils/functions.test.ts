import { expect } from 'chai';
import { set } from './functions';
 

describe('function.set ', () => {
    const key = 'olololo'
    const value = 'trololoo'

    
    let obj: Record<string, unknown>

    beforeEach(() => {
        obj = {}
    });

    it('Должно сохранить значение по указанному пути', () => {
        set(obj, key, value)

        expect(obj).to.haveOwnProperty(key, value)
    });

    it('Должно вернуть оригинальный объект', () => {
        const result = set(obj, key, value)

        obj.ehehehehe = 'ohohohoho'

        expect(result).to.equal(obj)
    })

})
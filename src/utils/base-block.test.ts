import { expect } from 'chai';
import Block from './base-block';
 
describe('Block', () => {
    class Component extends Block  {
        render() {
            return new DocumentFragment();
        }
    }

    it('Должен быть _id если блок создан', () => {
        const instance = new Component('div', {});
        const typeOfId = typeof instance._id;
        expect(typeof instance._id).to.eq(typeOfId);
    });
});
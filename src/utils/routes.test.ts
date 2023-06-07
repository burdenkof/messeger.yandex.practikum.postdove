import { router } from './routes';
import { expect } from 'chai';
import  Block  from './base-block';
import sinon = require('sinon');
 

describe('router', () => {

    global.window.history.forward = () => {
        if (typeof window.onpopstate === 'function') {
            window.onpopstate({ currentTarget: window } as unknown as PopStateEvent);
        }
    }
    global.window.history.back = () => {
        if (typeof window.onpopstate === 'function') {
            window.onpopstate({ currentTarget: window } as unknown as PopStateEvent);
        }
    }
    const content = sinon.fake.returns(document.createElement('div'));

    class Fake {
        dispatchComponentDidMount(){

        }
        show(){

        }
        hide(){

        }
        getContent = content
    }

    it('Метод use() должен вернуть объект роутер', () => {
        const result = router.use('/', () => {return new Fake() as unknown as Block});

        expect(result).to.eq(router);
    });

    describe('.back()', () => {
        it('Метод должен показать предыдущую страницу без отрисовки', () => {
            router
                .use('/', () => {return new Fake() as unknown as Block})
                .start()

            router.back()

            expect(content.callCount).to.eq(1);
        });
    });

    it('Метод start должен отрисовать страницу ', () => {
        router
            .use('/',() => {return new Fake() as unknown as Block})
            .start();

        expect(content.callCount).to.eq(1);
    });
});
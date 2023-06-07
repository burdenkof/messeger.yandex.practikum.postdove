/* eslint-disable import/extensions */
import { v4 as makeUUID } from 'uuid';
import EventBus from './event-bus';

type Props<P extends Record<string, unknown> = any> = { events?: Record<string, () => void> } & P;

abstract class Block<P extends Record<string, any> = any>{
    
    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_CDU: "flow:component-did-update",
        FLOW_RENDER: "flow:render"
    };

    _element: HTMLElement
    tagName: string

    _props:Props<P>
    props: Props<P>
    childs: Record<string, Block> | Record<string, Block[]>;

    _id: string
    eventBus: () => EventBus;
    _getChilds(propsAndChilds: any): any {
        const childs: { [key: string]: Block | Block[] } = {};
        const props: any = {};
        let key: keyof typeof propsAndChilds;
        for (key in propsAndChilds) {
            const value = propsAndChilds[key]
            if (value instanceof Block || Array.isArray(value)) {
                childs[key] = value;
            } else {
                props[key] = value;
            }
        }

        return { childs, props };
    }
    compile(template: string, props: Props<P>): DocumentFragment {
        const Handlebars = require("handlebars")
        const Templator = Handlebars.compile(template)
        const propsAndStubs:Props = { ...props }


        for (const key in this.props) {
            const child = props[key]
            if (Array.isArray(child)) {
                propsAndStubs[key] = child.map(row => `<div data-id="${row._id}"></div>`);
            } else if (child instanceof Block) {
                propsAndStubs[key] = `<div data-id="${child._id}"></div>`;

            }
        }

        const fragment: HTMLTemplateElement = this._createDocumentElement('template') as HTMLTemplateElement

        fragment.innerHTML = Templator({ ...propsAndStubs })
        const replaceChild = (row: Block) => {

            const _el = fragment.content.querySelector(`[data-id="${row._id}"]`)

            if (!_el) {
                return
            }
            row.getContent()?.append(...Array.from(_el.childNodes))

            _el.replaceWith(row.getContent()!)
        }

        for (const keyChilds in this.childs) {
            const child = this.childs[keyChilds]
            if (Array.isArray(child)) {
                child.forEach(replaceChild);
            } else {
                replaceChild(child);
            }
        }

        return fragment.content;

    }
    /** JSDoc
       * @param {string} tagName
       * @param {Object} props
       *
       * @returns {void}
       */
    constructor(tagName: string = "div", propsAndChilds: Props) {

        const eventBus = new EventBus()
        this.tagName = tagName

        const { childs } = this._getChilds(propsAndChilds);

        this.childs = childs;
        this._id = makeUUID();

        this._props = propsAndChilds

        this.props = this._makePropsProxy({ ...propsAndChilds, __id: this._id });

        this.eventBus = () => eventBus;

        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }

    _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this))
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this))
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this))
    }

    _createResources() {

        this._element = this._createDocumentElement(this.tagName)
    }

    init() {
        this._createResources();
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    _componentDidMount() {
        this.componentDidMount()
        for (const keyChilds in this.childs) {
            const child = this.childs[keyChilds]
            if (Array.isArray(child)) {
                child.map(row => row instanceof Block ? row.dispatchComponentDidMount() : '')
            } else {
                child.dispatchComponentDidMount()
            }
        }
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER)
    }


    componentDidMount() { }

    dispatchComponentDidMount() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    _componentDidUpdate(oldProps: Props, newProps: Props) {
        const response = this.componentDidUpdate(oldProps, newProps)
        if (response === true) {
            this.eventBus().emit(Block.EVENTS.FLOW_RENDER)
        }
    }


    componentDidUpdate(_oldProps: Props, _newProps: Props) {
        return true
    }

    setProps(nextProps: Props) {
        if (!nextProps) {
            return
        }

        Object.assign(this.props, nextProps)
    }

    get element() {
        return this._element;
    }

    _render() {
        const block = this.render()


        this._element.innerHTML = ''
        this._removeEvents();
        this._element.appendChild(block);
        this._addEvents();
    }
    private _removeEvents() {
        const { events = {} } = this.props;

        Object.keys(events).forEach((eventName: string) => {
            if (eventName === 'focus' || eventName === 'blur' || eventName === 'input' || eventName === 'keyup') {
                const temp = this._element.querySelector(`input`)
                if (temp !== null) {
                    temp.removeEventListener(eventName, events[eventName]);
                    return
                }
            }
            this._element.removeEventListener(eventName, events[eventName]);
        })
    }
    private _addEvents() {
        const { events = {} } = this.props;

        Object.keys(events).forEach((eventName: string) => {
            if (eventName === 'focus' || eventName === 'blur' || eventName === 'input' || eventName === 'keyup') {
                const temp = this._element.querySelector(`input`)
                if (temp !== null) {
                    temp.addEventListener(eventName, events[eventName]);
                    return
                }
            }
            this._element.addEventListener(eventName, events[eventName]);
        })
    }

    render(): any { }

    getContent() {
        return this.element;
    }

    _makePropsProxy(props: any) {

        const self = this;
        const proxyData = new Proxy(props, {
            get(target, prop) {
                const value = target[prop];
                return typeof value === "function" ? value.bind(target) : value;
            },
            set(target, prop, value) {
                const oldProps = { ...target }
                target[prop] = value
                self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, target)
                return true;
            },
            deleteProperty(_target, _prop) {
                throw new Error("Access denied");
            }
        });
        return proxyData;
    }

    _createDocumentElement(tagName: string) {

        const element = document.createElement(tagName);
        element.setAttribute('data-id', this._id);
        return element;
    }

    show() {
        const element = this.getContent();
        element.style.display = 'block'
    }

    hide() {
        const element = this.getContent();
        element.style.display = 'none'
    }
}
export default Block
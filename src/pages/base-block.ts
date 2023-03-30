import { EventBus } from "./event-bus";
import { v4 as makeUUID } from 'uuid';

class Block {

    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_CDU: "flow:component-did-update",
        FLOW_RENDER: "flow:render"
    };

    _element: HTMLElement
    tagName: string

    _props: any = {}
    props: any = {}
    childs: { [key: string]: Block }
    _id: string
    eventBus: () => EventBus;
    _getChilds(propsAndChilds: any): any {
        const children: { [key: string]: Block } = {};
        const props: any = {};
        let key: keyof typeof propsAndChilds;
        for (key in propsAndChilds) {
            const value = propsAndChilds[key]
            if (value instanceof Block) {
                children[key] = value;
            } else {
                props[key] = value;
            }
        }

        return { children, props };
    }
    compile(template: string, props: any): DocumentFragment {
        const Handlebars = require("handlebars")
        const Templator = Handlebars.compile(template)
        const propsAndStubs = { ...props };

        let key: keyof typeof props;
        for (key in props) {
            const child = props[key]
            propsAndStubs[key] = `<div data-id="${child._id}"></div>`
        }

        const fragment: HTMLTemplateElement = this._createDocumentElement('template') as HTMLTemplateElement;

        fragment.innerHTML = Templator.compile(template, propsAndStubs);


        for (const keyChilds in this.childs) {
            const child = this.childs[keyChilds]
            const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);

            if (stub) {
                stub.replaceWith(child.getContent());
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
    constructor(tagName: string = "div", propsAndChilds: object = {}) {

        const eventBus: EventBus = new EventBus();
        this.tagName = tagName

        const { childs, props } = this._getChilds(propsAndChilds);

        this.childs = childs;
        this._id = makeUUID();

        this._props = props

        this.props = this._makePropsProxy({ ...props, __id: this._id });

        this.eventBus = () => eventBus;

        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }

    _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    _createResources() {

        this._element = this._createDocumentElement(this.tagName);
    }

    init() {
        this._createResources();
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    _componentDidMount() {
        this.componentDidMount()
        for (const keyChilds in this.childs) {
            const child = this.childs[keyChilds]
            child.dispatchComponentDidMount();
        }
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }


    componentDidMount() { }

    dispatchComponentDidMount() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    _componentDidUpdate(oldProps: any, newProps: any) {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (response === true) {
            this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        }
    }


    componentDidUpdate(oldProps: any, newProps: any) {
        return true;
    }

    setProps = (nextProps: any) => {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    };

    get element() {
        return this._element;
    }

    _render() {
        const block = this.render(); // render теперь возвращает DocumentFragment


        this._element.innerHTML = ''; // удаляем предыдущее содержимое

        this._element.appendChild(block);

    }

    // Может переопределять пользователь, необязательно трогать
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
                target[prop] = value;
                self.eventBus().emit(Block.EVENTS.FLOW_CDU, { ...target }, target)
                return true;
            },
            deleteProperty(target, prop) {
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
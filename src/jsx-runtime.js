function createElement(tagName, { children, ...attributes }) {
    // console.log("in createElement", tagName, attributes, children)

    // If tag is a fragment, just return child tags
    if (tagName === 'fragment') return children

    // If tag is a function, execute it!
    if (typeof tagName === 'function') return tagName(attributes)

    // Otherwise tag will resolve to an element
    const elem = document.createElement(tagName)

    // Loop through props and either add event handlers or tag attributes
    if (attributes) {
        for (let key of Object.keys(attributes)) {
            let eventName = key.match(/^on([A-Z]\w+)$/);
            eventName ? 
                elem.addEventListener(eventName[1].toLowerCase(), attributes[key]) :
                elem.setAttribute(key, attributes[key]);
        }
    }

    // Attach child tags to parent tag
    if (Array.isArray(children)) {
        for (const child of children) {
            if (Array.isArray(child)) elem.append(...child)
            else elem.append(child)
        }
    } else {
        elem.append(children)
    }

    return elem
}

function render(component) {
    console.log("in render", component)
    if (component === null || component === false || typeof component === 'undefined') return []
    if (typeof component === 'string' || typeof component === 'number') return component.toString()
    if (component.tagName) return component
    if (typeof component === 'function' ) return render(component())
    console.log("did we get here???")
}


export { 
    createElement as jsx,
    createElement as jsxs,
    render
};
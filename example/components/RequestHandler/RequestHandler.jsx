/**
 * Example:
 *
 *    const handleResponse = (r) => return <div>{r.name}</div>;
 *
 *    <RequestHandler
 *       url='http://localhost:1337/json'
 *       responseHandler={handleResponse}
 *   />
 *
 */
const RequestHandler = (props) => {
    if (!props.url || !props.responseHandler) {
        return <p>RequestHandler requires a url and responseHandler function!</p>
    }

    async function makeRequest() {
        const response = await fetch(props.url);
        return await response.json()
    }

    let RequestWrapper = () => {
        let container = <div>Waiting for request</div>

        makeRequest().then((result) => {
            container.replaceWith(props.responseHandler(result))
        })

        return container
    }

    return <RequestWrapper />
}

export default RequestHandler;

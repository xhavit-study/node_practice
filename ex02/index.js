module.exports.compose = (middlewares) => {
    return async function () {
        return dispatch(0);

        function dispatch(i) {
            const fn = middlewares[i];

            if (!fn) return Promise.resolve();

            return Promise.resolve(
                fn(function next() {
                    return dispatch(i + 1);
                })
            );
        }
    };
};

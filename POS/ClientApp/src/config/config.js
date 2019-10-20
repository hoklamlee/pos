import config from 'react-global-configuration';

config.set({
    foo: 'bar',
    bar: {
        baz: 'qux'
    },
    baz: ['qux'],
    apiUrl: "https://localhost:44340/api"
});

export default config;
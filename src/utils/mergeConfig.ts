export default function(config: any) {
    let mergedConfig = { ...defaultConfig, ...config };
    mergedConfig.buildInRouters = { ...defaultConfig.buildInRouters, ...mergedConfig.buildInRouters };

    return mergedConfig;
}

const defaultConfig = {
    buildInRouters: {
        _404: true
    }
};
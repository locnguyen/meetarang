export default function(ngModule) {
    ngModule
        .constant('AppConfig', {
            apiBase: 'http://localhost:9000'
        });
}
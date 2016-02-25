export default function(ngModule) {
    class UserService {
        constructor($cookies) {
            this.$cookies = $cookies;
        }

        getToken() {
            return this.$cookies.get('token');
        }

        saveToken(token) {
            this.$cookies.put('token', token);
        }
    }

    ngModule
        .service('UserService', UserService);
}
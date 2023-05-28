import { createApp, onMounted, ref, watchEffect } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

createApp({
    setup() {
        const status = ref(null)
        const action = ref("Verfying Payment")
        const id = ref("")
        const errorMessage = ref(null)
        let response;

        watchEffect(() => {
            if (status) {
                setTimeout(() => {
                    status.value = null
                }, 10000)
            }
        })


        onMounted(async () => {
            const link = window.location.href;

            const urlParams = new URLSearchParams(link);
            const params = {};

            for (const [param, value] of urlParams) {
                params[param] = value;
            }

            id.value = params.id

            try {
                response = await axios.post("https://smiling-jay-houndstooth.cyclic.app/api/v1/auth", {

                    "password": "123456789", "email": "fiyinfoluwa2@gmail.com"

                })

                // window.open(params?.redirect, "_self")

                console.log(response, params.redirect)
            } catch (error) {
                status.value = 'failed'
                errorMessage.value = "Failed To Verify Code Try Again"
                // Redirect here
                console.log(error)
            }


            console.log(params)
        })
        return {
            id,
            status,
            action,
            errorMessage
        }
    }
}).mount('#main')
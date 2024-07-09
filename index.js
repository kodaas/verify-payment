import { createApp, onMounted, ref, watchEffect } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

createApp({
    setup() {
        const status = ref(null)
        const action = ref("Verifying Payment")
        const id = ref("")
        const tag = ref("")
        const errorMessage = ref(null)
        const successMessage = ref("Verification Initiated")

        watchEffect(() => {
            if (status) {
                setTimeout(() => {
                    status.value = null
                    errorMessage.value = null
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
            tag.value = params.tag

            try {
                const response = await axios.post(params.api, { transactionId: id.value, tag: tag.value })

                if (response.status === 200) {
                    successMessage.value = "Payment Verified"
                    status.value = 'success'
                    action.value = "Redirecting"
                    // Redirect here
                    setTimeout(() => {
                        window.open(params?.redirectSuccess, "_self")
                    }, 5000)

                } else {

                    status.value = 'failed'
                    errorMessage.value = "Failed To Verify Code Try Again"
                    action.value = "Redirecting"
                    // Redirect here
                    setTimeout(() => {
                        window.open(params?.redirectFailed, "_self")
                    }, 5000)

                }

            } catch (error) {
                status.value = 'failed'
                errorMessage.value = "Failed To Verify Code Try Again"
                action.value = "Redirecting"
                // Redirect here
                setTimeout(() => {
                    window.open(params?.redirectFailed, "_self")
                }, 5000)
            }
        })
        return {
            id,
            status,
            action,
            errorMessage
        }
    }
}).mount('#main')
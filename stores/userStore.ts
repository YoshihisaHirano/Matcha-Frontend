import { ActiveUser } from "~/types/global"

export const useUserStore = defineStore('user', () => {
    const user = ref<ActiveUser | null>(null)

    function setUser(newUser: ActiveUser | null) {
        user.value = newUser ? { ...newUser } : null
    }

    return { user, setUser }
})
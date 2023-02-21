import { User } from "~~/types/user";

export const user = ref<User | null>(null)
export const isAuth = ref(false)
export const isLoading = ref(false)
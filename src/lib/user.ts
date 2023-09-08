import { redirect } from "@sveltejs/kit"
import { prisma } from "./db"

export const handleUser = async (user) => {
    try {
        const user_db = await prisma.user.findUnique({
            where: {
                supabaseUserId: user.id
            }
        })

        if (user_db) {
            return user_db  
        }

        const new_user = await prisma.user.create({
            data: {
                supabaseUserId: user.id
            }
        })
        return new_user;
    } catch (error) {
        console.log(error)
        throw redirect(303, '/login')
    }
}

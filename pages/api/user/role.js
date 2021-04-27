// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from ".prisma/client"

const prisma = new PrismaClient();

export default async (req, res) => {
    try {
        const createMany = await prisma.role.createMany({
            data: [
                { roleType: req.body.role_name, roleDesc: req.body.role_desc }
            ],
            skipDuplicates: true,
        })

        const allRoles = await prisma.role.findMany({
            include: {
                User: true,
            },
        })

        console.dir(allRoles, { depth: null })

        res.status(200).json({ message: 'success!', data: createMany })
    } catch (error) {
        res.status(400).json({ roleType: 'error', error })
    }
}

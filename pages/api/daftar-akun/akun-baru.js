// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from ".prisma/client"

const prisma = new PrismaClient();

export default async (req, res) => {

    // console.log(error);
    try {
        const createMany = await prisma.akun.createMany({
            data: [
                {
                    kode_akun: req.body.kode_akun,
                    tipeId: parseInt(req.body.sub_akun),
                    nama_akun: req.body.nama_akun,
                    kategoriId: parseInt(req.body.header_akun),
                },
            ],
            skipDuplicates: true,
        })

        res.status(200).json({ message: 'success!', data: createMany })
    } catch (error) {
        res.status(400).json({ kode_akun: 'error', error })
        console.log(error)
    }
}

import prisma from "@/libs/prismadb";
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

export async function POST(
    request: Request
){
    try{
        const body = await request.json();
        const {
            email,
            name,
            password
        } = body;

        if (!email || !name || !password ){
            return new NextResponse('Missing info', { status: 400});
        }

        const hashedPassword = await bcrypt.hash(password, 13);
        //check to see of user exist of not
        const isUser = await prisma.user.findUnique({
            where: {
                email: email
            }
        });
        if(isUser){
            return  NextResponse.json({error: "User already registered."}, {status: 400});
        }


        const user = await prisma.user.create({
            data: {
                email,
                name,
                hashedPassword
            }
        });

        return NextResponse.json(user);
    }catch (error : any){
        console.error("Registeration failed: ", error);
    }
}
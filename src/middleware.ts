import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request:NextRequest){


const token = await getToken( {req:request} )

if(token){

if(request.nextUrl.pathname==="/Login"||request.nextUrl.pathname==="/Register"){
      return NextResponse.redirect(new URL("/",request.url))
    }else{
        return NextResponse.next();
    }

}else{
  if(
    request.nextUrl.pathname === "/Cart" ||
    request.nextUrl.pathname === "/Checkout" ||
    request.nextUrl.pathname === "/allorders" ||
    request.nextUrl.pathname === "/Profile"
  ){
     return NextResponse.redirect(new URL("/Login",request.url))
  }else{
    return NextResponse.next();
  }
}
}


export const config = {
  matcher: ['/Cart','/Login','/Register' , '/Checkout' , '/allorders' ,'/Profile'],
 } 
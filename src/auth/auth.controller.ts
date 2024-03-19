import { Body, Controller, HttpStatus, Post , HttpCode} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/auth.dto";
import { HttpAdapterHost } from "@nestjs/core";

@Controller('auth')
export class AuthController{
    constructor(private authService:AuthService ){}
    
    @Post('signup')
    signup(@Body() dto:AuthDto){
        return this.authService.signup(dto);
    }

    @HttpCode(HttpStatus.OK)
    @Post('signin')
    signin(@Body() dto:AuthDto){
        return this.authService.signin(dto);
    }

}
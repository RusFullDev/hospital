import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class JwtGuards implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    // console.log(req);

    const userHeader = req.headers.authorization;
    if (!userHeader) {
      throw new UnauthorizedException({ message: "user roy'xatdan o'tmagan" });
    }
    const bearer = userHeader.split(' ')[0];
    const token = userHeader.split(' ')[1];
    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException({
        message: "user roy'xatdan o'tmagan(token xato)",
      });
    }
    let user: any;
    try {
      user = this.jwtService.verify(token);
    } catch (error) {
      throw new UnauthorizedException({
        message: "user roy'xatdan o'tmagan(token berilmagan)",
      });
    }
    req.user = user;

    return true;
  }
}
